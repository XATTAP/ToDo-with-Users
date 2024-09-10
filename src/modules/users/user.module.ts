import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/src/database/Entities/user.entity';
import { UserService } from '@/src/modules/users/user.service';
import { UserController } from '@/src/modules/users/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
