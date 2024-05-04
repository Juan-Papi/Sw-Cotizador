import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './entities/attempt.entity';
import { ChatAiService } from '../chat-ai/chat-ai.service';
import { ChatAiModule } from '../chat-ai/chat-ai.module';

@Module({
  controllers: [AttemptController],
  providers: [AttemptService, ChatAiService],
  imports: [TypeOrmModule.forFeature([Attempt]), ChatAiModule],
  exports: [TypeOrmModule],
})
export class AttemptModule {}
