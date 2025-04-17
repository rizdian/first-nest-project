import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { AppLogger } from './logger.service';

@Injectable()
export class MdcMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID().replace(/-/g, ''); // ← remove dashes
    const context = new Map<string, any>();
    context.set('requestId', requestId);

    AppLogger.runWithContext(context, () => {
      next();
    });
  }
}
