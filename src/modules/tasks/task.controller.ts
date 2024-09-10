import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from '@/src/modules/tasks/task.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
} from '@/src/modules/tasks/dtos/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId')
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.taskService.findAllByUser(userId);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  updateTask(
    @Body() body: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
