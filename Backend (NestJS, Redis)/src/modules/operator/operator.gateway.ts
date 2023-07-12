import { Inject, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ConnectedSocket } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AppService } from 'src/app.service';
import { HelpCall } from 'src/entities/help-call.entity';
import { UserType } from 'src/enums/user-type.enum';
import { HelpCallDto } from 'src/models/help-call.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { OperatorService } from './operator.service';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class OperatorGateway {

  constructor(private readonly operatorService: OperatorService) { }

  @WebSocketServer() server: Server;

  @SubscribeMessage('getHelpCalls')
  async getCallList(@ConnectedSocket() client: Socket) {
    client.emit("getHelpCalls", await this.operatorService.getCallList())
  }

  @SubscribeMessage('callDone')
  async handleMessage(@MessageBody() id: number) {
    this.server.emit("callDone", await this.operatorService.callDone(id))
  }

  @SubscribeMessage('addCall')
  async addCall(@MessageBody("name") name: string, @MessageBody("phone") phone: string, @ConnectedSocket() client: Socket) {
    let call : HelpCall | undefined = await this.operatorService.requestHelpCall(name, phone)
    if(call){
      client.broadcast.emit("addCall", call);
      client.emit("getStatus", true);
    }else{
      client.emit("getStatus", false);
    }
  }
  
}
