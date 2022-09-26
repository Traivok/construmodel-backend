import { Body, Controller, Get, HttpCode, Logger, Post, Request, Session } from '@nestjs/common';
import { CatchEntityErrors }                                               from '../../commons/decorators/catch-entity-errors.decorator';
import { ApiBody, ApiResponse, ApiTags }                                   from '@nestjs/swagger';
import { User }                                                            from '../entities/user.entity';
import { ApiJwtAuth }                                                      from '../decorators/api-jwt-auth.decorator';
import { UserService }     from '../services/user.service';
import { ApiLocalAuth }    from '../decorators/api-local-auth.decorator';
import { UserDto }         from '../dtos/user.dto';
import { AuthService }     from '../services/auth.service';
import { AuthDto }         from '../dtos/auth.dto';
import { JwtDto }          from '../dtos/jwt.dto';
import { Express }         from '../interfaces/request.interface';
import { JwtPayloadDto }   from '../dtos/jwt-payload.dto';
import { Serialize }   from '../../commons/decorators/serialize.decorator';
import { RegisterDto } from '../dtos/register.dto';

@ApiTags('auth')
@Controller('auth')
@CatchEntityErrors(User.name)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService,
              private userService: UserService) {}

  @ApiLocalAuth()
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: AuthDto, required: true })
  @Serialize(JwtDto)
  @ApiResponse({ type: JwtDto })
  async login(@Request() req: Express.Request, @Session() session: Record<string, any>): Promise<JwtDto> {
    const jwt = await this.authService.loginJwt(req.user as User);
    this.authService.setJwtToSession(session, jwt);
    return jwt;
  }

  @Post('register')
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto) /* TODO not show password in swagger scheme */
  async register(@Body() newUser: RegisterDto): Promise<UserDto> {

    return await this.authService.register(newUser);
  }

  @ApiJwtAuth()
  @Serialize(UserDto)
  @Get('profile')
  @ApiResponse({ type: UserDto })
  async profile(@Request() req: Express.Request): Promise<UserDto> {
    const payload = req.user as JwtPayloadDto;
    return this.userService.findOneOrFail(payload.id);
  }
}