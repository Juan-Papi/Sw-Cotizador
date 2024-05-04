import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFullChatDto } from './dto/create-full-chat.dto';
import { UpdateFullChatDto } from './dto/update-full-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FullChat } from './entities/full-chat.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ChatAiService } from '../chat-ai/chat-ai.service';
import { ChatStockService } from '../chat-stock/chat-stock.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FullChatService {
  constructor(
    @InjectRepository(FullChat)
    private readonly fullChatRepository: Repository<FullChat>,
    private readonly dataSource: DataSource,
    private readonly chatAiService: ChatAiService,
    private readonly chatStockService: ChatStockService,
    private readonly authService: AuthService,
  ) {}

  async create(createFullChatDto: CreateFullChatDto, authUser: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const chatAi = this.chatAiService.create({
        numberAttempts: 10,
        occupied: 0,
      });

      const fullChat = new FullChat();
      fullChat.name = createFullChatDto.name;
      fullChat.userClient = authUser;
      fullChat.chatAi = chatAi;

      const userWithInfo =
        await this.authService.getUserWithMembershipAndChatStock(authUser.id);

      await this.chatStockService.update(userWithInfo.membership.chatStock.id, {
        chatsNumber: 0,
        occupied: 1,
        totalAttempts: 0,
      });

      await queryRunner.manager.save(fullChat);

      // Commit transaction
      await queryRunner.commitTransaction();
      return fullChat;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // Re-lanzar una excepción HTTP para manejar el error en el nivel del controller o global
      throw new HttpException(
        'Failed to create FullChat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all fullChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fullChat`;
  }

  update(id: number, updateFullChatDto: UpdateFullChatDto) {
    return `This action updates a #${id} fullChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} fullChat`;
  }
}
