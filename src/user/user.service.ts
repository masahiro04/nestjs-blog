import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {UpdateUserDto} from '../models/user.model';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
  }
  
  public async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({where: {username: username}})
  }
  
  public async updateUser(username: string, data: UpdateUserDto) {
    await this.userRepo.update({username}, data);
    return this.findByUsername(username);
  }
}
