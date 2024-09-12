import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '@/src/modules/tasks/task.service';
import {
  CreateTaskDto,
  SearchTasksDto,
  UpdateTaskDto,
} from '@/src/modules/tasks/dtos/task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId')
  @ApiOperation({
    summary: 'Получение задач, привязанных к пользователю по его id',
  })
  findAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: SearchTasksDto,
  ) {
    return this.taskService.findAllByUser(userId, query);
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой задачи' })
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление задачи' })
  updateTask(
    @Body() body: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.deleteTask(id);
  }
}
