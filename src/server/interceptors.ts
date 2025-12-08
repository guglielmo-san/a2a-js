import { A2AStreamEventData } from "../client/client.js";
import { ServerCallContext } from "./context.js";
import { A2ARequestHandler } from "./request_handler/a2a_request_handler.js";


export interface HandlerInterceptor {
  /**
   * Invoked before transport method.
   */
  before(args: BeforeArgs): Promise<EarlyReturnBefore>;

  /**
   * Invoked after transport method.
   */
  after(args: AfterArgs): Promise<EarlyReturnAfter>;
}

export interface EarlyReturnBefore<K extends keyof A2ARequestHandler = keyof A2ARequestHandler> {
  earlyReturn?: ServerCallResult<K>
}

export interface EarlyReturnAfter {
  earlyReturn?: boolean
}

export interface BeforeArgs<K extends keyof A2ARequestHandler = keyof A2ARequestHandler> {
  /**
   * Identifies the Server method invoked and its payload.
   * Payload inside the input object can be modified.
   */
  readonly input: ServerCallInput<K>;

  context?: ServerCallContext;
}

export interface AfterArgs<K extends keyof A2ARequestHandler = keyof A2ARequestHandler> {
  /**
   * Identifies the Server method invoked and its result.
   * Payload inside the result object can be modified.
   */
  readonly result: ServerCallResult<K>;

  context?: ServerCallContext;
}

export type ServerCallInput<K extends keyof A2ARequestHandler = keyof A2ARequestHandler> = MethodInput<A2ARequestHandler, K>;
export type ServerCallResult<K extends keyof A2ARequestHandler = keyof A2ARequestHandler> = MethodResult<
  A2ARequestHandler,
  K,
  ResultsOverrides
>;


// Types below are helper types and are not exported to allow simplifying it without affecting
// public API if necessary. They are exported via type aliases ServerXxx which can be replaced with explicit union if necessary.

/**
 * For
 *
 * interface Foo {
 *   f1(arg: string): Promise<Result1>;
 *   f2(arg: number): Promise<Result2>;
 * }
 *
 * MethodInputs<Foo> resolves to
 *
 * {
 *   readonly method: "f1";
 *   value: string;
 * } | {
 *   readonly method: "f2";
 *   value: number;
 * }
 */
type MethodInput<T, TMembers extends keyof T = keyof T> = {
  [M in TMembers]: T[M] extends (context: ServerCallContext | undefined) => unknown
    ? { readonly method: M; value?: never }
    : T[M] extends (payload: infer P) => unknown
      ? { readonly method: M; value: P }
      : never;
}[TMembers];

/**
 * For
 *
 * interface Foo {
 *   f1(): Promise<Result1>;
 *   f2(): Promise<Result2>;
 * }
 *
 * MethodsResults<Foo> resolves to
 *
 * {
 *   readonly method: "f1";
 *   value: Result1;
 * } | {
 *   readonly method: "f2";
 *   value: Result2;
 * }
 */
type MethodResult<T, TMembers extends keyof T = keyof T, TOverrides = object> = {
  [M in TMembers]: M extends keyof TOverrides // If there is an override, use it directly.
    ? { readonly method: M; value: TOverrides[M] }
    : // Infer result, unwrap it from Promise and pack with method name.
      T[M] extends (payload: unknown) => infer R
      ? { readonly method: M; value: Awaited<R> }
      : never;
}[TMembers];

interface ResultsOverrides {
  // sendMessageStream and resubscribeTask return async iterators and are intercepted on each item,
  // which requires custom handling.
  sendMessageStream: A2AStreamEventData;
  resubscribe: A2AStreamEventData;
}
