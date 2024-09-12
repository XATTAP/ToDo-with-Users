import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@/src/database/Entities/task.entity';
import { TaskService } from '@/src/modules/tasks/task.service';
import { TaskController } from '@/src/modules/tasks/task.controller';
import { UserModule } from '@/src/modules/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
