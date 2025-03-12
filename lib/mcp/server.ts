import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

export class WorkerServerTransport implements Transport {
  async start() {
    self.addEventListener("message", (ev) => {
      this.onmessage?.(ev.data);
    });
  }
  async send(message: JSONRPCMessage) {
    self.postMessage(message);
  }
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  onmessage?: (message: JSONRPCMessage) => void;
}
