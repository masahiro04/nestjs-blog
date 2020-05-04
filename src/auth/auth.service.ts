import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {LoginDto, RegisterDto} from '../models/user.dto';

@Injectable()
export class AuthService {
  
  private mockUser = {
    'email': 'jake@jake.jeake',
    'token': 'jwt.token.here',
    'username': 'jake',
    'bio': 'I work at statefarm',
    'image': null
  };
  
  public register(credentials: RegisterDto) {
    return this.mockUser;
  }
  
  public login(credentials: LoginDto) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }
    throw new InternalServerErrorException()
  }
  
}
