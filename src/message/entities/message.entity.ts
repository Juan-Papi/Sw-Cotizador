import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('message')
export class Message {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column('text')
    message: string;

    @Column({ type: 'time' })
    date: string;
  
    @Column('text',{nullable:true})
    emisor?: string;

    @Column('text',{nullable:true})
    receptor?: string;


    @ManyToOne(() => User, (user) => user.messages)
    user: User;


    @ManyToOne(() => Chat, (chat) => chat.messages)
    chatAsesor: Chat;
    


}

