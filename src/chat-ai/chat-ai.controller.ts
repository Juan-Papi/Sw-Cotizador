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

  // @Post('create-presupuesto')
  // async createPresupuesto(@Body() createChatAiDto: CreateChatAiDto) {
  //   //return this.chatAiService.createPresupuesto();
  // }

  @Post('create-image')
  createImage(@Body() createChatAiDto: CreateChatAiDto) {
    return this.chatAiService.createImage(createChatAiDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatAiService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatAiDto: UpdateChatAiDto) {
  //   return this.chatAiService.update(+id, updateChatAiDto);
  // }
}
