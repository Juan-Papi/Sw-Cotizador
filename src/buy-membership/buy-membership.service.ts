import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateBuyMembershipDto } from './dto/create-buy-membership.dto';
import { UpdateBuyMembershipDto } from './dto/update-buy-membership.dto';
import { BuyMembership } from './entities/buy-membership.entity';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CurrencyService } from '../currency/currency.service';
import { ChatStockService } from '../chat-stock/chat-stock.service';

@Injectable()
export class BuyMembershipService {
  private readonly logger = new Logger('BuyMembershipService');
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly dataSource: DataSource,
    private readonly chatStockService: ChatStockService,
  ) {}

  async create(
    createBuyMembershipDto: CreateBuyMembershipDto,
    authUserId: string,
  ) {
    // De momento esto debe meterse en la base de datos de manera estatica de tal forma
    //que se encuentre una moneda con ese ID
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.getCustomUser(authUserId);

      const currency = await this.currencyService.findOne(1);

      const buyMembership = new BuyMembership();

      buyMembership.date = createBuyMembershipDto.date,
      buyMembership.planName = createBuyMembershipDto.planName,
      buyMembership.description = createBuyMembershipDto.description,
      buyMembership.price = createBuyMembershipDto.price;
      buyMembership.benefits = createBuyMembershipDto.benefits;
      buyMembership.currency = currency;
      buyMembership.membership = user.membership;
      buyMembership.attempts = createBuyMembershipDto.attempts;
      buyMembership.chatsNumber = createBuyMembershipDto.chatsNumber;

      await this.dataSource.manager.save(buyMembership);

      const totalAttempts =
        createBuyMembershipDto.chatsNumber * createBuyMembershipDto.attempts;

      await this.chatStockService.update(user.membership.chatStock.id, {
        chatsNumber: createBuyMembershipDto.chatsNumber,
        totalAttempts,
        occupied: 0,
      });
      await queryRunner.commitTransaction();
      return `Successful Purchase!`;
    } catch (error) {
      this.handleDBErrors(error);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  private async getCustomUser(userId: string) {
    const user = await this.dataSource.getRepository(User).findOneOrFail({
      relations: {
        membership: {
          chatStock: true,
        },
      },
      where: { id: userId },
    });
    return user;
  }

  findAll() {
    return `This action returns all buyMembership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyMembership`;
  }

  update(id: number, updateBuyMembershipDto: UpdateBuyMembershipDto) {
    return `This action updates a #${id} buyMembership`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyMembership`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
