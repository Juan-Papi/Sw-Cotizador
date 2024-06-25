import { Module } from '@nestjs/common';
import { ChatAsesorService } from './chat-asesor.service';
import { ChatAsesorGateway } from './chat-asesor.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports:[ChatModule,AuthModule,MessageModule],
  providers: [ChatAsesorGateway, ChatAsesorService],
  exports: [ChatAsesorService]
})
export class ChatAsesorModule {}
