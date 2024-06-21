import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FullChat } from '../../full-chat/entities/full-chat.entity';

@Entity('chat_ai')
export class ChatAi {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  data: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  numberAttempts: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  occupied: number;

  @ManyToOne(() => FullChat, (fullChat) => fullChat.chatAis)
  fullChat: FullChat;
}
