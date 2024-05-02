import { Injectable } from '@nestjs/common';
import { CreateChatStockDto } from './dto/create-chat-stock.dto';
import { UpdateChatStockDto } from './dto/update-chat-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatStock } from './entities/chat-stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatStockService {
  constructor(
    @InjectRepository(ChatStock)
    private readonly chatStockRepository: Repository<ChatStock>,
  ) {}

  async create(createChatStockDto: CreateChatStockDto) {
    const newChatStock = this.chatStockRepository.create(createChatStockDto);
    return await this.chatStockRepository.save(newChatStock);
  }

  findAll() {
    return `This action returns all chatStock`;
  }

  async findOne(term: number) {
    const chatStock = await this.chatStockRepository
      .createQueryBuilder('chatStock')
      .where('chatStock.id = :id', { id: term })
      .getOneOrFail();
    return chatStock;
  }

  async update(id: number, updateChatStockDto: UpdateChatStockDto) {
    const chatStock = await this.findOne(id);
    await this.chatStockRepository.update(
      {
        id,
      },
      {
        chatsNumber: chatStock.chatsNumber + updateChatStockDto.chatsNumber,
        occupied: chatStock.occupied + updateChatStockDto.occupied,
        totalAttempts:
          chatStock.totalAttempts + updateChatStockDto.totalAttempts,
      },
    );
    return 'Successful Upgrade!';
  }

  remove(id: number) {
    return `This action removes a #${id} chatStock`;
  }
}
