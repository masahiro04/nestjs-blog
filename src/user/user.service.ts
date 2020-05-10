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
  
  public async followUser(currentUser: UserEntity, username: string) {
    const user = await this.userRepo.findOne({where: {username: username}, relations: ['followers']});
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }
  
  public async unfollowUser(currentUser: UserEntity, username: string) {
    const user = await this.userRepo.findOne({where: {username: username}, relations: ['followers']});
    user.followers = user.followers.filter(follower => follower !== currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }
}
