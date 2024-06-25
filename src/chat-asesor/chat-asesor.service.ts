import { Injectable } from '@nestjs/common';

interface User {
    id: string;
    name: string;
}


@Injectable()
export class ChatAsesorService {

    private users: Record<string, User> = {};
    private rooms: Record<string, User[]> = {}; 

    onUserConnected( user: User) {
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
}
