import { Injectable } from '@nestjs/common';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

@Injectable()
export class McpService {
  private readonly client: Client;
  private readonly transport: SSEClientTransport;

  constructor() {
    // this.transport = new StdioClientTransport({
    //   command: 'node',
    //   args: ['dist/main.js'],
    //   cwd: 'C:/Users/irfan/Desktop/EdgeFirm/mcp/mcp-app',
    // });
    this.transport = new SSEClientTransport(
      new URL('http://localhost:3001/mcp/sse'),
    );
    this.client = new Client(
      {
        name: 'example-client',
        version: '1.0.0',
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
        },
      },
    );
  }

  async onModuleInit() {
    await this.client.connect(this.transport);
    console.log('✅ MCP Client Connected...');
    this.listTools();
    this.callTool('scan_nmap', {
      target: 'localhost',
      timing: 3,
      ports: '3001',
    });
  }

  async listTools() {
    const tools = await this.client.listTools();
    console.log('🔧 Available Tools:', tools);
    return tools;
  }

  async callTool(name: string, args: Record<string, any>) {
    try {
      const result = await this.client.callTool({ name, arguments: args });
      console.log(`✅ Tool Executed: ${name}`, result);
      return result;
    } catch (error) {
      console.error(`❌ Error executing tool: ${name}`, error);
      throw error;
    }
  }
}
