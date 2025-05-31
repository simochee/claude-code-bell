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

server.tool("notify-prompt", { message: z.string() }, async ({ message }) => {
  console.log(`notify prompt: ${message}`);

  notifier.notify({
    title: "Claude Code Bell (1)",
    message,
    sound: true,
    wait: true,
  });

  return {
    content: [],
  };
});

server.tool("notify-finish", { message: z.string() }, async ({ message }) => {
  console.log(`notify finish: ${message}`);

  notifier.notify({
    title: "Claude Code Bell (2)",
    message,
    sound: true,
    wait: true,
  });

  return {
    content: [],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
