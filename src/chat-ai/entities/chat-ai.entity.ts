import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FullChat } from '../../full-chat/entities/full-chat.entity';
import { Attempt } from '../../attempt/entities/attempt.entity';

@Entity('chat_ai')
export class ChatAi {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  numberAttempts: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  occupied: number;

  @OneToOne(() => FullChat, (fullChat) => fullChat.chatAi) // specify inverse side as a second parameter
  fullChat: FullChat;

  @OneToMany(() => Attempt, (attempt) => attempt.chatAi)
  attempts: Attempt[];
}
