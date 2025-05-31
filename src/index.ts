#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import notifier from "node-notifier";
import { z } from "zod";
import pkg from "../package.json" with { type: "json" };

const server = new McpServer({
  name: "Claude Code Bell",
  version: pkg.version,
});

server.tool(
  "notify-process-finished",
  "Sends a desktop notification to inform the user that a task or process has completed. This tool MUST be called when finishing any work session.",
  {
    summary: z.string().describe("Brief description of the completed work"),
  },
  async ({ summary }) => {
    notifier.notify({
      title: "Claude Code Finished",
      message: summary,
      sound: "Glass",
    });

    return {
      content: [{ type: "text", text: `Notification sent: ${summary}` }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
