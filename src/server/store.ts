import fs from "fs/promises";
import path from "path";
import {ListTasksParams, ListTasksResult, Task} from "../types.js";
import { A2AError } from "./error.js";
import {
  getCurrentTimestamp,
  isArtifactUpdate,
  isTaskStatusUpdate,
} from "./utils.js";

/**
 * Simplified interface for task storage providers.
 * Stores and retrieves the task.
 */
export interface TaskStore {
  /**
   * Saves a task.
   * Overwrites existing data if the task ID exists.
   * @param data An object containing the task.
   * @returns A promise resolving when the save operation is complete.
   */
  save(task: Task): Promise<void>;

  /**
   * Loads a task by task ID.
   * @param taskId The ID of the task to load.
   * @returns A promise resolving to an object containing the Task, or undefined if not found.
   */
  load(taskId: string): Promise<Task | undefined>;

  list(params: ListTasksParams): Promise<Task[]>;
}

// ========================
// InMemoryTaskStore
// ========================

// Use Task directly for storage
export class InMemoryTaskStore implements TaskStore {
  private store: Map<string, Task> = new Map();

  async load(taskId: string): Promise<Task | undefined> {
    const entry = this.store.get(taskId);
    // Return copies to prevent external mutation
    return entry ? {...entry} : undefined;
  }

  async save(task: Task): Promise<void> {
    // Store copies to prevent internal mutation if caller reuses objects
    this.store.set(task.id, {...task});
  }

  async list(params: ListTasksParams): Promise<Task[]> {
    // Returns the list of saved tasks
    const filteredTasks = Array.from(this.store.values())
        // Apply filters
        .filter(task => !params.contextId || task.contextId === params.contextId)
        .filter(task => !params.status || task.status.state === params.status)
        .filter(task => {
            if (!params.lastUpdatedAfter) return true;
            if (!task.status.timestamp) return false; // Tasks without timestamp don't match 'lastUpdatedAfter'
            return new Date(task.status.timestamp) > new Date(params.lastUpdatedAfter);
        })
        .filter(task => {
            if (!params.pageToken) return true;
            if (!task.status.timestamp) return false; // Tasks without timestamp don't match 'pageToken'
            // pageToken is a timestamp, so we want tasks older than the pageToken
            return new Date(task.status.timestamp) < new Date(Buffer.from(params.pageToken, 'base64').toString('utf-8'));
        })

        // Sort by timestamp in descending order (most recently updated tasks first)
        filteredTasks.sort((t1, t2) => {
        const ts1 = t1.status.timestamp ? new Date(t1.status.timestamp).getTime() : 0;
        const ts2 = t2.status.timestamp ? new Date(t2.status.timestamp).getTime() : 0;
        return ts2 - ts1;
        });
    // Make a copy of the history and artifacts as they might get modified
    return filteredTasks.map(task => ({
            ...task,
            history: task.history ? [...task.history] : undefined,
            artifacts: task.artifacts ? [...task.artifacts] : undefined,
          }));
    }
  
}
