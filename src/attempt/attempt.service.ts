import { Injectable } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';
import { Attempt } from './entities/attempt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ChatAiService } from '../chat-ai/chat-ai.service';

@Injectable()
export class AttemptService {
  constructor(
    @InjectRepository(Attempt)
    private readonly attemptRepository: Repository<Attempt>,
    private readonly dataSource: DataSource,
    private readonly chatAiService: ChatAiService,
  ) {}

  async create(createAttemptDto: CreateAttemptDto) {
    const chatAi = await this.chatAiService.findOne(createAttemptDto.chatAiID);
    const chatAiUpdated = await this.chatAiService.update(chatAi.id, {
      occupied: chatAi.occupied + 1,
    });

    const attempt = new Attempt();
    attempt.chatAi = chatAiUpdated;

    return await this.dataSource.manager.save(attempt);
  }

  async findOne(term: number) {
    return await this.attemptRepository.findOneOrFail({
      where: {
        id: term,
      },
    });
  }

  async update(id: number, updateAttemptDto: UpdateAttemptDto) {
    return await this.attemptRepository.update(id, {
      data: updateAttemptDto.data,
    });
  }
}
