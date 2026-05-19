import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService, JwtStrategy],
})
export class AppModule {}
