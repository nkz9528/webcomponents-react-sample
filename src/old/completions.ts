import { WorkerClientTransport } from "./old/mcp/client";
import MyWorker from "./worker?worker&inline";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function runWorker() {
  const client = new Client({
    name: "sample",
    version: "1.0.0",
  });
  const worker = new MyWorker();
  const trasport = new WorkerClientTransport(worker);
  await client.connect(trasport);
  const { tools } = await client.listTools();
  console.log(tools);
  return tools;
}

// runWorker();
