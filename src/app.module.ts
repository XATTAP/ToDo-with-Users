import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@/src/database/database.module';
import { UserModule } from '@/src/modules/users/user.module';
import { TaskModule } from '@/src/modules/tasks/task.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, UserModule, TaskModule],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
