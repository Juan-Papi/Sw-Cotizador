import { Injectable } from '@nestjs/common';
import { Chat } from '../chat/entities/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Message } from 'src/message/entities/message.entity';

interface User1 {
    id: string;
    name: string;
}


@Injectable()
export class ChatAsesorService {

    private users: Record<string, User1> = {};
    private rooms: Record<string, User1[]> = {}; 

    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        ){
    }

    onUserConnected( user: User1) {
        this.users[user.id] = user;
    }

    onUserDisconnected( id: string) {
        delete this.users[id];

        for (const room in this.rooms) {
            this.rooms[room] = this.rooms[room].filter(user => user.id !== id);
        }
    }

    getUsers() {
        return Object.values( this.users);
    }

    joinRoom(userId: string, room: string) {
        if (!this.rooms[room]) {
           const chat = this.chatRepository.create();
           this.chatRepository.save(chat);
           this.rooms[room] = [];
        }
        const user = this.users[userId];
        if (user) {
            this.rooms[room].push(user);
        }
    }

    leaveRoom(userId: string, room: string) {
        if (this.rooms[room]) {
            this.rooms[room] = this.rooms[room].filter(user => user.id !== userId);
            if (this.rooms[room].length === 0) {
                delete this.rooms[room];
            }
        }
    }

    getUsersInRoom(room: string) {
        return this.rooms[room] || [];
    }

  async saveMessage(message: string, name:string, receptor:string){
        const user = this.userRepository.findOneOrFail({
            where: {name: name}, relations: ['messages'] 
          });
        const currentime = new Date().toISOString().split('T')[1].split('.')[0];
        const newMessage = this.messageRepository.create({
            message: message,
            date: currentime,
            emisor:name,
            receptor:receptor
        });
        await this.messageRepository.save(newMessage);
       // (await user).messages.push(newMessage);
        
        console.log("se guardo");
        
    }

}
