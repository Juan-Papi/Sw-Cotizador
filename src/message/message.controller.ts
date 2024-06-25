import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

  @Post(':chatId')
  async create(
    @Param('chatId') chatId: number,
    @Body('userId') userId: string,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.messageService.create(createMessageDto, userId, chatId);
  }

  @Get(':chatId')
  async findAllByChat(@Param('chatId') chatId: number): Promise<Message[]> {
    return this.messageService.findAllByChat(chatId);
  }
  
  @Get()
  async findAll(){
    return this.messageService.findAll();
  }
}
