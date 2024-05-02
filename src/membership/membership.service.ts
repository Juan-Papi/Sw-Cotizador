import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ChatStockService } from '../chat-stock/chat-stock.service';
import { CreateChatStockDto } from '../chat-stock/dto/create-chat-stock.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    private readonly chatStockService: ChatStockService,
  ) {}

  async create(createChatStockDto: CreateChatStockDto, user: User) {
    const newChatStock = await this.chatStockService.create(createChatStockDto);
    const newMembership = this.membershipRepository.create({
      user,
      chatStock: newChatStock,
    });
    return await this.membershipRepository.save(newMembership);
  }

  findAll() {
    return `This action returns all membership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} membership`;
  }

  update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return `This action updates a #${id} membership`;
  }

  remove(id: number) {
    return `This action removes a #${id} membership`;
  }
}
