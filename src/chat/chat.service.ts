import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
    
    constructor( 
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>
    ){}

    async create(){
        const chat = new Chat();
        return await this.chatRepository.save(chat);
    }

    async findOne(term: any) {
        return await this.chatRepository.findOneOrFail({
          where: {id: term}
        });
    }

    async findAll(){
        const chats = await this.chatRepository.find();
    return chats
     }

    async delete(id: number): Promise<void> {
        const deleteResult = await this.chatRepository.delete(id);

        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Chat with ID ${id} not found`);
        }
    }
}
