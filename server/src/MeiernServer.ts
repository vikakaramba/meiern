import { Socket } from "socket.io";
import {
  Player,
  SetActivePlayerAction,
  SetPlayerListAction,
  SetPlayerNameAction,
  GetPlayerListAction,
} from "common/lib/Player";
import { Server } from "socket.io";

class ServerPlayer extends Player {
  public socketId: string | null = null;

  constructor(name: string, id: number, socketId: string) {
    super(name, id);
    this.socketId = socketId;
  }

  public toPlayer(): Player {
    return new Player(this.name, this.id);
  }
}

export class MaiernServer {
  private id = 0;
  private allPlayer: ServerPlayer[] = [];

  constructor(server: Server) {
    server.on("connection", (socket: Socket) => {
      socket.on(SetPlayerNameAction.type, (setPlayerName) =>
        this.addPlayer(setPlayerName, socket)
      );
      socket.on("disconnect", (reason: string) => {
        this.handleDisconnect(socket, reason);
      });
      socket.on(GetPlayerListAction.type, () => {
        socket.emit(
          SetPlayerListAction.type,
          new SetPlayerListAction(
            this.allPlayer.map((player) => player.toPlayer())
          )
        );
      });
    });
  }

  private addPlayer(setPlayerName: SetPlayerNameAction, socket: Socket): void {
    const player = new ServerPlayer(setPlayerName.name, this.id, socket.id);
    this.id += 1;
    this.allPlayer.push(player);
    socket.emit(SetActivePlayerAction.type, new SetActivePlayerAction(player));
    this.broadcastPlayerList(socket);
    console.log(this.allPlayer);
  }

  private broadcastPlayerList(socket: Socket): void {
    socket.nsp.emit(
      SetPlayerListAction.type,
      new SetPlayerListAction(
        this.allPlayer.map((serverPlayer) => serverPlayer.toPlayer())
      )
    );
  }

  private handleDisconnect(socket: Socket, reason: string): void {
    socket.disconnect(true);
    console.log(reason);
    this.allPlayer = this.allPlayer.filter(
      (serverPlayer) => serverPlayer.socketId !== socket.id
    );
    this.broadcastPlayerList(socket);
  }
}
