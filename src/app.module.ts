import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@/src/database/database.module';
import { UserModule } from '@/src/modules/users/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
