import { Resolver, Query } from '@nestjs/graphql';
import { HealthService } from './health.service';
import { HealthDto } from './dto/health.dto';
import { Logger } from '@nestjs/common';

@Resolver()
export class HealthResolver {
  private logger: Logger;

  constructor(private readonly healthService: HealthService) {
    this.logger = new Logger(HealthResolver.name);
  }

  @Query(() => HealthDto)
  async getHealth(): Promise<HealthDto> {
    this.logger.log('Entering getHealth()');
    return this.healthService.getHealth();
  }
}
