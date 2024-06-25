import { ApiProperty } from '@nestjs/swagger';
import { Column,Entity, OneToOne, JoinColumn,PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { FullChat } from '../../full-chat/entities/full-chat.entity';
import { Message } from 'src/message/entities/message.entity';


@Entity('chat')
export class Chat {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => FullChat, (fullChat) => fullChat.chatAi) 
    fullChat: FullChat;

    @OneToMany(() => Message, (message) => message.chatAsesor)
    messages: Message[];
}