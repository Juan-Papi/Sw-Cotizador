import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FullChatService } from './full-chat.service';
import { CreateFullChatDto } from './dto/create-full-chat.dto';
import { UpdateFullChatDto } from './dto/update-full-chat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('full-chat')
export class FullChatController {
  constructor(private readonly fullChatService: FullChatService) {}

  @Post()
  @Auth()
  create(
    @Body() createFullChatDto: CreateFullChatDto,
    @GetUser() authUser: User,
  ) {
    return this.fullChatService.create(createFullChatDto, authUser);
  }

  @Get()
  findAll() {
    return this.fullChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fullChatService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFullChatDto: UpdateFullChatDto,
  ) {
    return this.fullChatService.update(+id, updateFullChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fullChatService.remove(+id);
  }
}
