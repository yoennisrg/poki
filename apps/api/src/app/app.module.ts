import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppsModule } from '../apps/apps.module';
import { App } from '../apps/app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(process.cwd(), 'apps', 'api', 'data', 'poki.sqlite'),
      entities: [App],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AppsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
