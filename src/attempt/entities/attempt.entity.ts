import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatAi } from '../../chat-ai/entities/chat-ai.entity';

@Entity('attempt')
export class Attempt {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text', { nullable: true })
  data: string;

  @ManyToOne(() => ChatAi, (chatAi) => chatAi.attempts)
  chatAi: ChatAi;
}
