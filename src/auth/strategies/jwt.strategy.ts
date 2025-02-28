import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/all-config.type';
import { JwtPayload } from '../types/jwt-payload.type';
import { OrNeverType } from '../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('auth.secret', { infer: true }),
    });
  }

  validate(payload: JwtPayload): OrNeverType<JwtPayload> {
    if (!payload._id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
