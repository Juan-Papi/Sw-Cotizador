import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './entities/message.entity';
import { User } from '../auth/entities/user.entity';
import { Asesor } from 'src/asesor/entities/asesor.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from 'src/chat/entities/chat.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ){}

    async create(createMessageDto: CreateMessageDto, userId: string, chatId: number): Promise<Message> {
        // const chat = await this.chatRepository.findOne(chatId);
        const chat = await this.chatRepository.findOneOrFail({
            where: { id : chatId}
        });
        if (!chat) {
          throw new NotFoundException('Chat not found');
        }
    
        const message = this.messageRepository.create({
          ...createMessageDto,
          chatAsesor: chat,
          user: { id: userId } as any, // Asumiendo que solo necesitas el id del usuario
        });
    
        return await this.messageRepository.save(message);
      }

      async findAllByChat(chatId: number): Promise<Message[]> {
        return await this.messageRepository.find({
          where: { chatAsesor: { id: chatId } },
          relations: ['user', 'chatAsesor'],
        });
      }

      async findAll(){
        const messages = await this.messageRepository.find();
        return messages;
      }
}
