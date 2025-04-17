import { Injectable, LoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { DateTimeUtil } from '../utils/datetime.util';

@Injectable()
export class AppLogger implements LoggerService {
  private static storage = new AsyncLocalStorage<Map<string, any>>();

  static runWithContext(context: Map<string, any>, callback: () => void) {
    AppLogger.storage.run(context, callback);
  }

  private get context(): Map<string, any> | undefined {
    return AppLogger.storage.getStore();
  }

  private formatMessage(level: string, message: any, context?: string) {
    const reqId = this.context?.get('requestId') ?? 'N/A';
    const timestamp = DateTimeUtil.format();
    return `[${reqId}] ${timestamp} ${level.toUpperCase()} ${context ?? 'App'}: ${message}`;
  }

  log(message: any, context?: string) {
    console.log(this.formatMessage('log', message, context));
  }

  error(message: any, trace?: string, context?: string) {
    console.error(this.formatMessage('error', message, context), trace);
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: any, context?: string) {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose?(message: any, context?: string) {
    console.info(this.formatMessage('verbose', message, context));
  }
}
