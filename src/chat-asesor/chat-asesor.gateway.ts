import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer,ConnectedSocket } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatAsesorService } from './chat-asesor.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChatAsesorGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private users = new Map<string, any>(); 

  constructor(private chatAsesorService: ChatAsesorService) {}

  afterInit(server: any) {
    console.log('ejecutandose');
  }

  handleConnection(client: Socket) {
    const user = client.handshake.auth.user;
    
    if (!user){
      client.disconnect();
      return;
    }

    let userJson = JSON.parse(user)
    console.log('se ha conectado: ', userJson.name);

    this.chatAsesorService.onUserConnected({id:userJson.id, name: userJson.name});
    console.log(this.chatAsesorService.getUsers());
    
  //  this.users.set(userJson.id,  { client, user: userJson });
  }

  handleDisconnect(client: Socket) {
    const user = client.handshake.auth.user;
    let userJson = JSON.parse(user);

    this.chatAsesorService.onUserDisconnected(userJson.id);
    // const userData = this.users.get(userJson.id);
    // if (userData) {
    //   console.log(`${userData.user.name} se ha desconectado`);
    //   this.users.delete(userJson.id);
    // }
  }


  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
    const user = JSON.parse(client.handshake.auth.user);
    this.chatAsesorService.joinRoom(user.id, data.room);
    client.join(data.room);
   // const userJson = this.users.get(client.id);
    console.log(`${user.name} se ha unido a la sala ${data.room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
    const user = JSON.parse(client.handshake.auth.user);
    client.leave(data.room);
    // const userJson = this.users.get(client.id);
    console.log(`${user.name} ha dejado la sala ${data.room}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { room: string, message: string }, @ConnectedSocket() client: Socket) {
    const user = JSON.parse(client.handshake.auth.user);
    // const userJson = this.users.get(client.id);
    this.server.to(data.room).emit('message', { user: user.name, message: data.message });
  }
}
