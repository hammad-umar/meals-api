import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Invalid Credentials.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Credentials.');
    }

    const tokenPayload: JwtPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    delete user.password;

    return {
      message: 'Logged in successfully.',
      accessToken,
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    let user = await this.usersService.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new UnprocessableEntityException('Email is already taken.');
    }

    user = await this.usersService.create(createUserDto);
    delete user.password;

    return {
      message: 'Registered successfully.',
      user,
    };
  }
}
