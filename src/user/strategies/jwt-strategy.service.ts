import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from 'passport-jwt';
import { ConfigService }    from '@nestjs/config';
import { AuthService }      from '../services/auth.service';
import { UserService }      from '../services/user.service';
import { JwtPayloadDto }    from '../dtos/jwt-payload.dto';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService,
              private authService: AuthService,
              private userService: UserService) {
    super({
      jwtFromRequest:   authService.getExtractingMethods(),
      ignoreExpiration: false,
      secretOrKey:      configService.getOrThrow<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { id, role } = await this.userService.findOneOrFail(payload.id);

    if (id !== payload.id)
      return null;

    return { id, role };
  }
}