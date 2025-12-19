import { Module } from '@nestjs/common';
import { PicsurApiModule } from './api/api.module.js';
import { ImageModule } from './image/image.module.js';
import { FrontendController } from './frontend.controller.js';

@Module({
  imports: [PicsurApiModule, ImageModule],
  controllers: [FrontendController],
})
export class PicsurRoutesModule { }
