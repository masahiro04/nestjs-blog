import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseConnectionService} from './database-connection.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EasyconfigModule } from  'nestjs-easyconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: DatabaseConnectionService}),
    EasyconfigModule.register({path: './.env'}),
    AuthModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
