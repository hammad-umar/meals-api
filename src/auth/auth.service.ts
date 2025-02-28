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
import { COMMON_MESSAGE, ERROR_MESSAGE } from '../common';

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
      throw new BadRequestException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }

    const tokenPayload: JwtPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    delete user.password;

    return {
      message: COMMON_MESSAGE.SIGNIN_SUCCESSFULLY,
      accessToken,
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    let user = await this.usersService.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new UnprocessableEntityException(ERROR_MESSAGE.EMAIL_TAKEN);
    }

    user = await this.usersService.create(createUserDto);
    delete user.password;

    return {
      message: COMMON_MESSAGE.SIGNUP_SUCCESSFULLY,
      user,
    };
  }
}
