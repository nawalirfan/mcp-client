// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { Client } from '@modelcontextprotocol/sdk/client/index.js';
// import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// import { McpService } from 'src/mcp/mcp.service';

// @Injectable()
// export class McpClientService implements OnModuleInit {
//   private readonly client: Client;
//   private transport: StdioClientTransport;

//   constructor(@Inject(McpService) private readonly mcpService: McpService) {
//     // Initialize transport with command to run the server

//     // Create MCP Client
//     this.client = new Client(
//       {
//         name: 'example-client',
//         version: '1.0.0',
//       },
//       {
//         capabilities: {
//           prompts: {},
//           resources: {},
//           tools: {},
//         },
//       },
//     );
//   }

//   async onModuleInit() {
//     const server = this.mcpService.getServer();
//     this.transport = new StdioClientTransport(server);
//     await this.client.connect(this.transport);
//     console.log('✅ MCP Client Connected...');
//     this.listTools();
//     this.callTool('do_something', { name: 'John Doe' });
//   }

//   async listTools() {
//     const tools = await this.client.listTools();
//     console.log('🔧 Available Tools:', tools);
//     return tools;
//   }

//   async callTool(name: string, args: Record<string, any>) {
//     try {
//       const result = await this.client.callTool({ name, arguments: args });
//       console.log(`✅ Tool Executed: ${name}`, result);
//       return result;
//     } catch (error) {
//       console.error(`❌ Error executing tool: ${name}`, error);
//       throw error;
//     }
//   }

//   getClient(): Client {
//     return this.client;
//   }
// }
