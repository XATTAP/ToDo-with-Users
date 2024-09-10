import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@/src/database/Entities/task.entity';
import { TaskService } from '@/src/modules/tasks/task.service';
import { TaskController } from '@/src/modules/tasks/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
