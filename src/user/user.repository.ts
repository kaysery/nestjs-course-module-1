import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import {
  fromCreateUserDtoToUserDto,
  fromUpdateUserDtoToUserDto,
} from './mappers';

@Injectable()
export class UserRepository {
  users: UserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const user = fromCreateUserDtoToUserDto(createUserDto);
    user.id = randomUUID();
    user.createdAt = new Date();
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const userFinded = this.users.find((user) => user.id === id);
    if (!userFinded) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFinded;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userFinded = this.users.find((user) => user.id === id);
    if (!userFinded) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userUpdated = fromUpdateUserDtoToUserDto(updateUserDto);
    userUpdated.id = userFinded.id;
    userUpdated.createdAt = userFinded.createdAt;
    userUpdated.updatedAt = new Date();
    const index = this.users.indexOf(userFinded);
    this.users[index] = userUpdated;
    return userUpdated;
  }

  remove(id: string) {
    const userFinded = this.users.find((user) => user.id === id);
    if (!userFinded) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const index = this.users.indexOf(userFinded);
    this.users.splice(index, 1);
    return userFinded;
  }
}
