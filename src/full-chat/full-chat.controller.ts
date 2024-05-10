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
}
