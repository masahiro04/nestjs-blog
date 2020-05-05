import {Injectable} from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'sqlite',
      database: 'gimejob-api',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: [UserEntity]
    };
  }
}
