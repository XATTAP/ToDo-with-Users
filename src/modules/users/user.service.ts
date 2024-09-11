import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { User } from '@/src/database/Entities/user.entity';
import {
  CreateUserDto,
  SearchUsersDto,
  UpdateUserDto,
} from '@/src/modules/users/dtos/user.dto';
import { USER_CREATED_EARLIER, USER_NOT_FOUND } from '@/src/utils/consts';
import { generateHash } from '@/src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException({ message: USER_NOT_FOUND.message });
    }
    return user;
  }

  async findAll(query: SearchUsersDto): Promise<User[]> {
    const findManyOptions: FindManyOptions = {
      skip: (query.page - 1) * query.limit,
      take: query.limit,
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

    const users = await this.userRepository.find(findManyOptions);
    return users;
  }

  async createUser(body: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      throw new ConflictException({ message: USER_CREATED_EARLIER.message });
    }
    body.password = await generateHash(body.password);
    return await this.userRepository.save(body);
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const user = await this.findById(id);
    if (body.password) body.password = await generateHash(body.password);
    return await this.userRepository.save({ id: user.id, ...body });
  }

  async deleteUser(id: number) {
    const user = await this.findById(id);
    return await this.userRepository.delete(user.id);
  }
}
