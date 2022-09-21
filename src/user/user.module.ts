import { Module }                 from '@nestjs/common';
import { UserService }            from './services/user.service';
import { UserController }         from './controllers/user.controller';
import { AuthController }         from './controllers/auth.controller';
import { LocalStrategyService }   from './strategies/local-strategy.service';
import { JwtStrategyService }     from './strategies/jwt-strategy.service';
import { AuthService }            from './services/auth.service';
import { TypeOrmModule }          from '@nestjs/typeorm';
import { User }                   from './entities/user.entity';
import { PassportModule }         from '@nestjs/passport';
import { APP_INTERCEPTOR }        from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { JwtModule }              from '@nestjs/jwt';
import { ConfigService }          from '@nestjs/config';

@Module({
  imports:     [
    TypeOrmModule.forFeature([ User ]),

    PassportModule,

    JwtModule.registerAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        signOptions: { expiresIn: '1h' },
        secret:      conf.getOrThrow<string>('COOKIE_SECRET'),
      } ),
    }),
  ],
  providers:   [
    UserService,
    AuthService,
    LocalStrategyService,
    JwtStrategyService,
    {
      provide:  APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [
    UserController,
    AuthController,
  ],
})
export class UserModule {}
