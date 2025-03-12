import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WorkerServerTransport } from "./mcp/server";
import { z } from "zod";

async function setup() {
  const server = new McpServer({
    name: "sample",
    version: "1.0.0",
  });

  server.tool(
    "calculate-bmi",
    {
      weightKg: z.number(),
      heightM: z.number(),
    },
    async ({ weightKg, heightM }) => ({
      content: [
        {
          type: "text",
          text: String(weightKg / (heightM * heightM)),
        },
      ],
    })
  );

  const transport = new WorkerServerTransport();
  await server.connect(transport);
}

setup();

export default {};
