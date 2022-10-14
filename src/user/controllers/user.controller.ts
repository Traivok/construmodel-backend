import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Query,
}                               from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatchEntityErrors }    from '../../commons/decorators/catch-entity-errors.decorator';
import { User }                 from '../entities/user.entity';
import { UserService }          from '../services/user.service';
import { AuthService }          from '../services/auth.service';
import { ApiPaginatedResponse } from '../../commons/pagination/api-paginated-response.decorator';
import { UserDto }              from '../dtos/user.dto';
import { PageOptionsDto }       from '../../commons/pagination/page-options.dto';
import { PageDto }              from '../../commons/pagination/page.dto';
import { plainToInstance }      from 'class-transformer';
import { Serialize }            from '../../commons/decorators/serialize.decorator';
import { ApiJwtAuth }           from '../decorators/api-jwt-auth.decorator';
import { CurrentUser }          from '../decorators/current-user.decorator';
import { UpdateUserDto }        from '../dtos/update-user.dto';
import { UserRoles }            from '../enums/user-roles';

@ApiTags('user')
@Controller('user')
@CatchEntityErrors(User.name)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService,
              private authService: AuthService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  async findAll(@Query() pageOptions: PageOptionsDto): Promise<PageDto<UserDto>> {
    const { meta, data } = await this.userService.findAllPaginated(pageOptions);
    return new PageDto<UserDto>(
      plainToInstance(UserDto, data, { excludeExtraneousValues: true }),
      meta,
    );
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.findOneOrFail(id);
  }

  @ApiJwtAuth()
  @Patch(':id')
  @Serialize(UserDto)
  async update(@Param('id', ParseIntPipe) id: number,
               @Body() updateUserDto: UpdateUserDto,
               @CurrentUser() currentUser: User): Promise<UserDto> {
    this.userService.checkOwnership(id, currentUser);

    if ('isAdmin' in updateUserDto && currentUser.role !== UserRoles.ADMIN)
      throw new ForbiddenException(`User ${ currentUser.username } should be admin to change user.id = ${ id } admin status`);

    return await this.authService.update(id, updateUserDto);
  }

  @ApiJwtAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number,
               @CurrentUser() currentUser: User): Promise<void> {
    this.userService.checkOwnership(id, currentUser);
    await this.userService.remove(id);
  }
}