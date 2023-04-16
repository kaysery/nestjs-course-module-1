import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

export function fromCreateUserDtoToUserDto(
  createUserDto: CreateUserDto,
): UserDto {
  const user = new UserDto();
  user.name = createUserDto.name;
  user.email = createUserDto.email;
  user.password = createUserDto.password;
  return user;
}

export function fromUpdateUserDtoToUserDto(
  updateUserDto: UpdateUserDto,
): UserDto {
  const user = new UserDto();
  user.name = updateUserDto.name;
  user.email = updateUserDto.email;
  user.password = updateUserDto.password;
  user.updatedAt = new Date();
  return user;
}
