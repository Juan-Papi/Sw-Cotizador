import { Module } from '@nestjs/common';
import { ChatAsesorService } from './chat-asesor.service';
import { ChatAsesorGateway } from './chat-asesor.gateway';

@Module({
  providers: [ChatAsesorGateway, ChatAsesorService],
})
export class ChatAsesorModule {}
