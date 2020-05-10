import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
  }
  
  public async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({where: {username: username}})
  }
}
