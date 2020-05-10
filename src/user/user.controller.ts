import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from '../auth/user.decorator';
import {AuthGuard} from '@nestjs/passport';
import {UserEntity} from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  
  @Get()
  @UseGuards(AuthGuard())
  findUser(@User() {username}: UserEntity) {
    return this.userService.findByUsername(username);
  }
}
