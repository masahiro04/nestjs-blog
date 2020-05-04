import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseConnectionService} from './database-connection.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
