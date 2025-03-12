import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

export class WorkerClientTransport implements Transport {
  private worker: Worker;
  constructor(worker: Worker) {
    this.worker = worker;
  }
  async start() {
    this.worker.addEventListener("message", (ev) => {
      this.onmessage?.(ev.data);
    });
  }
  async send(message: JSONRPCMessage) {
    this.worker.postMessage(message);
  }
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  onmessage?: (message: JSONRPCMessage) => void;
}
