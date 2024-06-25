import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from '../auth/auth.module';
import { Chat } from './entities/chat.entity';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [TypeOrmModule.forFeature([Chat]), AuthModule],
  exports: [TypeOrmModule],
})
export class ChatModule {}
