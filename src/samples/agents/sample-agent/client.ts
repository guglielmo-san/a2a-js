import { ServiceError, credentials } from "@grpc/grpc-js";
import { A2AServiceClient, SendMessageRequest, Role, SendMessageResponse} from "../../../grpc/a2a.js";

const client = new A2AServiceClient(
  "localhost:8080",
  credentials.createInsecure()
);

function sendMessageExample() {
  const request: SendMessageRequest = {
    tenant: "sample-tenant",
    configuration: {
        blocking: true,
        acceptedOutputModes: ["text"],
        pushNotificationConfig: undefined,
    },
    metadata: {},
    request: {
      messageId: "msg-1",
      parts: [
        {
          part: { $case: "text", value: "Hello, Agent!" },
          metadata: {},
        },
      ],
      role: Role.ROLE_USER,
      contextId: "context-1",
        taskId: undefined,
        metadata: {},
        extensions: [],
        referenceTaskIds: [],
    },
  };

  client.sendMessage(request, (error: ServiceError | null, response: SendMessageResponse) => {
    if (error) {
      console.error("Error sending message:", error);
    } else {
      console.log("Received response:", response);
    }
  });
}

sendMessageExample();