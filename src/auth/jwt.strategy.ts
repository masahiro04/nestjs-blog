import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {AuthPayload} from '../models/user.model';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET
    });
  }
  
  async validate(payload: AuthPayload) {
    const {username} = payload;
    const user = this.userRepo.find({where: {username}});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}


