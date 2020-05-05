import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {RegisterDto} from '../models/user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
  }
  
  public async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException()
    }
  }
  
  public async login({email, password}) {
    try {
      const user = this.userRepo.findOne({where: {email: email}});
      const isValid = (await user).comparePassword(password);
      if (!isValid) {
        return user;
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
