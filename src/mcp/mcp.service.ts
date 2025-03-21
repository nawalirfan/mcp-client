import { Injectable } from '@nestjs/common';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

@Injectable()
export class McpService {
  private readonly client: Client;
  private readonly transport: StdioClientTransport;

  constructor() {
    this.transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/main.js'],
      cwd: 'C:/Users/irfan/Desktop/EdgeFirm/mcp/mcp-app',
    });
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
      scanType: 'quick',
      timing: 3,
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

  getClient(): Client {
    return this.client;
  }
}
