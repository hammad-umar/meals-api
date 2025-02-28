import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { hash } from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
  }

  async findOneBy(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return this.usersRepository.findOne(filterQuery);
  }

  async me(_id: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ _id });
    delete user.password;
    return user;
  }
}
