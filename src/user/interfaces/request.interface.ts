import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { User }          from '../entities/user.entity';

export namespace Express {
  export interface Request {
    /**
     * @description passport automatically set property
     */
    user?: JwtPayloadDto;
    currentUser?: User;
  }
}