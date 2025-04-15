import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

export function mapUserDtoToEntity(dto: CreateUserDto): User {
  const user: User = new User();
  user.name = dto.name;
  user.username = dto.username;
  user.email = dto.email;
  user.password = dto.password;
  user.gender = dto.gender;

  return user
}

export function mapAutoUserDtoToEntity(dto: CreateUserDto): User {
  return plainToInstance(User, dto);
}