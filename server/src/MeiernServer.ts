import { Socket } from "socket.io";
import {
  Player,
  SetActivePlayerAction,
  SetPlayerListAction,
  SetPlayerNameAction,
} from "common/lib/Player";
import { Server } from "socket.io";

export class MaiernServer {
  private id = 0;
  private allPlayer: Player[] = [];

  constructor(server: Server) {
    server.on("connection", (socket: Socket) => {
      socket.on(SetPlayerNameAction.type, (setPlayerName) =>
        this.addPlayer(setPlayerName, socket)
      );
    });
  }

  private addPlayer(setPlayerName: SetPlayerNameAction, socket: Socket): void {
    const player: Player = new Player(setPlayerName.name, this.id);
    this.id += 1;
    this.allPlayer.push(player);
    socket.emit(SetActivePlayerAction.type, new SetActivePlayerAction(player));
    socket.nsp.emit(
      SetPlayerListAction.type,
      new SetPlayerListAction(this.allPlayer)
    );
    console.log(this.allPlayer);
  }
}
