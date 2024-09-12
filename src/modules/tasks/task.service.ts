import { Task } from '@/src/database/Entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  CreateTaskDto,
  SearchTasksDto,
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

  async findAllByUser(userId: number, query: SearchTasksDto) {
    const findManyOptions: FindManyOptions = {
      skip: (Number(query.page) - 1) * Number(query.limit),
      take: Number(query.limit),
      where: {
        user: {
          id: userId,
        },
      },
    };

    if (query.sort) {
      const [sortField, sortOrder] = query.sort.split(':');
      findManyOptions.order = {
        [sortField]: sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      };
    }

    if (query.search) {
      const [searchField, searchValue] = query.search.split(':');
      findManyOptions.where = {
        ...findManyOptions.where,
        [searchField]: Like(`%${searchValue}%`),
      };
    }

    const tasks = (await this.taskRepository.find(findManyOptions))
    return tasks;
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
