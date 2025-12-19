import { Controller, Get, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { ServeStaticConfigService } from '../config/early/serve-static.config.service.js';

@Controller()
export class FrontendController {
  constructor(private readonly staticConfig: ServeStaticConfigService) { }

  @Get('*')
  async fallback(@Res() res: FastifyReply) {
    const staticDir = this.staticConfig.getStaticDirectory();
    return (res as any).sendFile('index.html', staticDir);
  }
}
