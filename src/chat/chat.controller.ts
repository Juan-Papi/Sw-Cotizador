import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    NotFoundException
 } from '@nestjs/common';
 import { Chat } from './entities/chat.entity';
 import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {

    constructor( private readonly chatService: ChatService){}

    @Post('create')
    async create(){
        return this.chatService.create();
    }

    @Get(':id')
    async findOne(@Param('id') id:any ){
      return this.chatService.findOne(id);
    }

    @Get()
    async findAll() {
      return this.chatService.findAll()
    }

    @Delete(':id')
    async delete(@Param('id') id: any): Promise<void> {
      await this.chatService.delete(id);
    }
}
