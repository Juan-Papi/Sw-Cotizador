import { Module } from '@nestjs/common';
import { ChatAiService } from './chat-ai.service';
import { ChatAiController } from './chat-ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatAi } from './entities/chat-ai.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ChatAiController],
  providers: [ChatAiService, ConfigService],
  imports: [TypeOrmModule.forFeature([ChatAi])],
  exports: [TypeOrmModule],
})
export class ChatAiModule {}
