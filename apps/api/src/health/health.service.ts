import { Injectable, Logger } from '@nestjs/common';
import { HealthDto } from './dto/health.dto';

@Injectable()
export class HealthService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(HealthService.name);
  }

  async getHealth(): Promise<HealthDto> {
    this.logger.log('Entering getHealth()');
    return {
      isHealthy: true,
    };
  }
}
