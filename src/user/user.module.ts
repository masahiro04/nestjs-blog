import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {ProfileController} from './profile.controller';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [
    ProfileController,
    UserController
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
