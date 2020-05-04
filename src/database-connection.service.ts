import {Injectable} from '@nestjs/common';
import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from '@nestjs/typeorm';

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
      entities: ['dist/**/*.entitiy.js']
    };
  }
}
