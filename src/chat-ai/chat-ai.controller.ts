import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatAiService } from './chat-ai.service';
import { CreateChatAiDto } from './dto/create-chat-ai.dto';
import { UpdateChatAiDto } from './dto/update-chat-ai.dto';

@Controller('chat-ai')
export class ChatAiController {
  constructor(private readonly chatAiService: ChatAiService) {}

  @Post()
  create(@Body() createChatAiDto: CreateChatAiDto) {
    return this.chatAiService.create(createChatAiDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatAiDto: UpdateChatAiDto) {
    return this.chatAiService.update(+id, updateChatAiDto);
  }
}
