import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatAiDto } from './dto/create-chat-ai.dto';
import { UpdateChatAiDto } from './dto/update-chat-ai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatAi } from './entities/chat-ai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatAiService {
  constructor(
    @InjectRepository(ChatAi)
    private readonly chatAiRepository: Repository<ChatAi>,
  ) {}

  create(createChatAiDto: CreateChatAiDto) {
    return this.chatAiRepository.create(createChatAiDto);
  }

  async findOne(term: number) {
    return await this.chatAiRepository.findOneOrFail({
      where: {
        id: term,
      },
    });
  }

  async update(id: number, updateChatAiDto: UpdateChatAiDto) {
    try {
      const chatAi = await this.findOne(id);
      if (!chatAi) {
        throw new HttpException('Chat AI not found', HttpStatus.NOT_FOUND);
      }

      if (chatAi.numberAttempts === chatAi.occupied) {
        throw new HttpException(
          'Stock of attempts by chat finished',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.chatAiRepository.update(id, {
        ...updateChatAiDto,
      });

      return await this.findOne(id); 
    } catch (error) {
      // Aquí puedes manejar errores específicos o re-lanzar errores generales
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.FORBIDDEN
      ) {
        throw error; // Re-lanza el error si es un error de negocio ya manejado
      } else {
        // Maneja cualquier otro tipo de error no esperado
        console.error('An unexpected error occurred', error);
        throw new HttpException(
          'An unexpected error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
