import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/src/app.controller';
import { AppService } from '@/src/app.service';
import { TypeOrmModule } from '@/src/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
