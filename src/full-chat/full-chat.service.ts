import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateFullChatDto } from './dto/create-full-chat.dto';
import { FullChat } from './entities/full-chat.entity';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ChatAiService } from '../chat-ai/chat-ai.service';
import { ChatStockService } from '../chat-stock/chat-stock.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FullChatService {
  private readonly logger = new Logger('FullChatService');
  constructor(
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

      const userAdvisor = await this.authService.getRandomAdvisor();

      const fullChat = new FullChat();
      fullChat.name = createFullChatDto.name;
      fullChat.userClient = authUser;
      fullChat.chatAi = chatAi;
      fullChat.userAsesor = userAdvisor;

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
      this.handleDBErrors(error);
      // Re-lanzar una excepción HTTP para manejar el error en el nivel del controller o global
      // throw new HttpException(
      //   'Failed to create FullChat',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(`${error}`);
  }
}
