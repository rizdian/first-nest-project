import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppLogger } from '../../common/logger/logger.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating a new user', UserController.name);
    const user = await this.userService.create(createUserDto);
    this.logger.log(`User created with ID ${user.id}`, UserController.name);
    return user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users', UserController.name);
    this.logger.debug('Fetching all users', UserController.name);
    this.logger.warn('Fetching all users', UserController.name);
    this.logger.error('Fetching all users', UserController.name);
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    this.logger.log(`Fetching user with ID ${id}`, UserController.name);
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`Updating user with ID ${id}`, UserController.name);
    const updatedUser = await this.userService.update(id, updateUserDto);
    this.logger.log(`User with ID ${id} updated`, UserController.name);
    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.warn(`Deleting user with ID ${id}`, UserController.name);
    await this.userService.remove(id);
    this.logger.log(`User with ID ${id} deleted`, UserController.name);
  }
}
