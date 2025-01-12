import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private readonly logger;

  constructor() {
    this.logger = new Logger(CryptoService.name);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(inputPassword: string, originalPassword: string): Promise<boolean> {
    this.logger.log(`Entering comparePassword()`);
    this.logger.debug(`Comparing password: ${inputPassword} with stored password: ${originalPassword}`);
    return await bcrypt.compare(inputPassword, originalPassword);
  }
}
