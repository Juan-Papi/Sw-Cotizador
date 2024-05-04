import { Module } from '@nestjs/common';
import { ChatAiService } from './chat-ai.service';
import { ChatAiController } from './chat-ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatAi } from './entities/chat-ai.entity';

@Module({
  controllers: [ChatAiController],
  providers: [ChatAiService],
  imports: [TypeOrmModule.forFeature([ChatAi])],
  exports: [TypeOrmModule],
})
export class ChatAiModule {}
