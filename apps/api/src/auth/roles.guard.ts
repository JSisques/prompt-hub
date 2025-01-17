import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(RolesGuard.name);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(`Entering canActivate(${context})`);
    //const request = context.switchToHttp().getRequest();
    return true;
  }
}
