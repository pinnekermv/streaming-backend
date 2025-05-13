import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamingModule } from './streaming/streaming.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'streamingDB',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    StreamingModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
