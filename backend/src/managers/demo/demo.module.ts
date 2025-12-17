import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ImageDBModule } from '../../collections/image-db/image-db.module.js';
import { RoleDbModule } from '../../collections/role-db/role-db.module.js';
import { EarlyConfigModule } from '../../config/early/early-config.module.js';
import { HostConfigService } from '../../config/early/host.config.service.js';
import { DemoManagerService } from './demo.service.js';

@Module({
  imports: [ImageDBModule, EarlyConfigModule, RoleDbModule],
  providers: [DemoManagerService],
})
export class DemoManagerModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DemoManagerModule.name);

  constructor(
    private readonly demoManagerService: DemoManagerService,
    private readonly hostConfigService: HostConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    if (this.hostConfigService.isDemo()) {
      this.logger.warn('Demo mode enabled, images are ephimeral');
      await this.setupDemoMode();
    }
  }

  onModuleDestroy() {
    // Clean up the interval to prevent memory leaks
    if (this.schedulerRegistry.doesExist('interval', 'demo')) {
      this.schedulerRegistry.deleteInterval('demo');
      this.logger.log('Cleaned up demo interval');
    }
  }

  private async setupDemoMode() {
    this.demoManagerService.setupRoles();

    const interval = setInterval(
      // Run demoManagerService.execute() every interval
      this.demoManagerService.execute.bind(this.demoManagerService),
      this.hostConfigService.getDemoInterval(),
    );
    this.schedulerRegistry.addInterval('demo', interval);
  }
}
