import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatAiDto } from './dto/create-chat-ai.dto';
import { UpdateChatAiDto } from './dto/update-chat-ai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatAi } from './entities/chat-ai.entity';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class ChatAiService {
  private readonly API_KEY_GPT = this.configService.get('API_KEY_GPT');

  constructor(
    @InjectRepository(ChatAi)
    private readonly chatAiRepository: Repository<ChatAi>,
    private readonly configService: ConfigService,
  ) {}

  async create(createDto: CreateDto) {
    const chatAi = new ChatAi();
    chatAi.data = createDto.data; // Assign data from DTO; it's okay if it's undefined
    chatAi.images = createDto.images || []; // Assign images, use an empty array if undefined

    await this.chatAiRepository.save(chatAi);
    return chatAi;
  }

  async createPresupuesto(createChatAiDto: CreateChatAiDto) {
    const openai = new OpenAI({
      apiKey: this.API_KEY_GPT,
    });

    //Presupuesto
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'From now on he takes the role of architect',
        },
        { role: 'user', content: '' },
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(completion.choices[0]);
    //Generacion de imagenes

    //return this.chatAiRepository.create(createChatAiDto);
  }

  async createImage(createChatAiDto: CreateChatAiDto) {
    const chatAi = await this.findOne(createChatAiDto.iDChatAi);

    const url = 'https://api.openai.com/v1/images/generations';
    const data = {
      model: 'dall-e-3',
      prompt: `${createChatAiDto.prompt}`,
      n: 1,
      size: '1024x1024',
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.API_KEY_GPT}`,
      },
    };

    try {
      const response = await axios.post(url, data, config);
      const imageUrls = response.data.data[0].url; // Assume response data structure
      // console.log(response.data.data[0].url);
      // Append the new image URL to the existing array
      chatAi.images = [...chatAi.images, imageUrls];

      // Save the updated entity
      await this.chatAiRepository.save(chatAi);
      return chatAi; // return the updated ChatAi entity
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
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
