import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { McpModule } from './mcp/mcp.module.js';

@Module({
  imports: [McpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
