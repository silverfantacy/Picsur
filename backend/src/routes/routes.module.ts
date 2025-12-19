import { Module } from '@nestjs/common';
import { EarlyConfigModule } from '../config/early/early-config.module.js';
import { PicsurApiModule } from './api/api.module.js';
import { ImageModule } from './image/image.module.js';
import { FrontendController } from './frontend.controller.js';

@Module({
  imports: [PicsurApiModule, ImageModule, EarlyConfigModule],
  controllers: [FrontendController],
})
export class PicsurRoutesModule { }
