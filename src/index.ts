#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import pkg from "../package.json" with { type: "json" };

const server = new McpServer({
  name: "Claude Code Bell",
  version: pkg.version,
});

const transport = new StdioServerTransport();
await server.connect(transport);
