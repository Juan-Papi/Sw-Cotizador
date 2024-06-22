import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ChatAiService } from './chat-ai.service';
import { CreateChatAiDto } from './dto/create-chat-ai.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto';

@ApiTags('chat-ai')
@Controller('chat-ai')
export class ChatAiController {
  constructor(private readonly chatAiService: ChatAiService) {}

  @Post('create-presupuesto')
  async createPresupuesto(@Body() createChatAiDto: CreateChatAiDto) {
    return this.chatAiService.createPresupuesto(createChatAiDto);
  }

  @Post('create-image')
  createImage(@Body() createChatAiDto: CreateChatAiDto) {
    return this.chatAiService.createImage(createChatAiDto);
  }
}
