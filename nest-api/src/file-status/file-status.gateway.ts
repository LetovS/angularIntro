import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'https://localhost:4200',
    credentials: true,
  },
  namespace: '/filestatushub',
})
export class FileStatusGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit  {
  
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('SubscribeToUser')
  handleSubscribeToUser(client: Socket, userId: number) {
    const group = `user-${userId}`;
    client.join(group);
    console.log(`Client ${client.id} joined group ${group}`);
  }

  // Это метод для отправки события на клиента
  notifyUser(userId: number, data: any) {
    this.server.to(`user-${userId}`).emit('FileStatusChanged', data);
  }

  afterInit() {
    // Запускаем интервал при инициализации Gateway
    setInterval(() => {
      const message = {
        timestamp: new Date(),
        message: 'Это сообщение раз в 10 секунд',
      };
    }, 10000); // каждые 10 секунд
  }
}
