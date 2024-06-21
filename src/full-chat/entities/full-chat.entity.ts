import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ChatAi } from '../../chat-ai/entities/chat-ai.entity';

@Entity('full_chat')
export class FullChat {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  name: string;

  @ManyToOne(() => User, (user) => user.fullChats)
  userClient: User;

  @ManyToOne(() => User, (user) => user.supFullChats)
  userAsesor: User;

  @OneToMany(() => ChatAi, (chatAi) => chatAi.fullChat)
  chatAis: ChatAi;

}
