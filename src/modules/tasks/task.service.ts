import { Task } from '@/src/database/Entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTaskDto,
  UpdateTaskDto,
} from '@/src/modules/tasks/dtos/task.dto';
import { TASK_NOT_FOUND } from '@/src/utils/consts';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findById(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException({ message: TASK_NOT_FOUND.message });
    }
    return task;
  }

  async findAllByUser(userId: number) {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async createTask(body: CreateTaskDto) {
    return await this.taskRepository.save(body);
  }

  async updateTask(id: number, body: UpdateTaskDto) {
    const task = await this.findById(id);
    return await this.taskRepository.save({ id: task.id, ...body });
  }

  async deleteTask(id: number) {
    const task = await this.findById(id);
    return await this.taskRepository.delete(task.id);
  }
}
