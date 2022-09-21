import { Module }         from '@nestjs/common';
import { UserService }    from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthController }         from './controllers/auth.controller';
import { JwtRoleStrategyService } from './strategies/jwt-role-strategy.service';
import { JwtStrategyService }     from './strategies/jwt-strategy.service';
import { AuthService }            from './services/auth.service';

@Module({
  imports:     [],
  providers:   [
    UserService,
    AuthService,
    JwtStrategyService,
    JwtRoleStrategyService
  ],
  controllers: [ UserController, AuthController ],
})
export class UserModule {}
