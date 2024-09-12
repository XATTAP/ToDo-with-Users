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
import { UserService } from '@/src/modules/users/user.service';
import {
  CreateUserDto,
  SearchUsersDto,
  UpdateUserDto,
} from '@/src/modules/users/dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  findAll(@Query() query: SearchUsersDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение пользователя по его id' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление информации о пользователе' })
  updateUser(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
