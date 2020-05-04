import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto, RegisterDto} from '../models/user.dto';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }
  
  @Post()
  public register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.authService.register(credentials);
  }
  
  
  @Post('/login')
  public login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
