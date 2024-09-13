import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as fs from 'node:fs';
import * as path from 'path';

function writeToFile(filePath: string, message: string) {
  fs.appendFile(filePath, message + '\n', (err) => {
    if (err) {
      console.error('Failed to write log to file', err);
    }
  });
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logDirectory = path.join(__dirname, '..', '..', 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const dateNow = new Date().toDateString();
    const logFilePath = path.join(logDirectory, `${dateNow}.txt`);

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const now = Date.now();
    const logMessage =
      '--------------------------------------------\r' +
      `${new Date().toTimeString()}:\r` +
      `Request:${request.method} ${decodeURIComponent(request.url)}\r` +
      `Body: ${JSON.stringify(request.body)}`;

    writeToFile(logFilePath, logMessage);

    return next.handle().pipe(
      map((data) => {
        const responseTime = Date.now() - now;
        const logMessage =
          '\r' +
          `Response: ${response.statusCode}\r` +
          `Body: ${JSON.stringify(data)}\r` +
          `Response time: ${responseTime}ms`;
        writeToFile(logFilePath, logMessage);
        return data;
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        const logMessage =
          '\r' +
          `Error: ${error.status} ${error.message}\r` +
          `Response time: ${responseTime}ms`;
        writeToFile(logFilePath, logMessage);
        throw error;
      }),
    );
  }
}
