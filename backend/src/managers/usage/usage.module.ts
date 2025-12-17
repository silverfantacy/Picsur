import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ImageDBModule } from '../../collections/image-db/image-db.module.js';
import { SystemStateDbModule } from '../../collections/system-state-db/system-state-db.module.js';
import { UserDbModule } from '../../collections/user-db/user-db.module.js';
import { LateConfigModule } from '../../config/late/late-config.module.js';
import { UsageConfigService } from '../../config/late/usage.config.service.js';
import { UsageService } from './usage.service.js';

@Module({
  imports: [LateConfigModule, SystemStateDbModule, ImageDBModule, UserDbModule],
  providers: [UsageService],
  exports: [UsageService],
})
export class UsageManagerModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UsageManagerModule.name);

  constructor(
    private readonly usageService: UsageService,
    private readonly usageConfigService: UsageConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    if (!(await this.usageConfigService.getMetricsEnabled())) {
      this.logger.log('Telemetry is disabled');
    }

    const interval = setInterval(
      this.cronJob.bind(this),
      await this.usageConfigService.getMetricsInterval(),
    );
    this.schedulerRegistry.addInterval('usage', interval);

    this.cronJob();
  }

  onModuleDestroy() {
    // Clean up the interval to prevent memory leaks
    if (this.schedulerRegistry.doesExist('interval', 'usage')) {
      this.schedulerRegistry.deleteInterval('usage');
      this.logger.log('Cleaned up usage interval');
    }
  }

  private cronJob() {
    this.usageService.execute().catch((err) => {
      this.logger.warn(err);
    });
  }
}
