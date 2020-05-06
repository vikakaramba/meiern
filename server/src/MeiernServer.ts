import { Socket } from "socket.io";
import {
  Player,
  SetActivePlayerAction,
  SetPlayerListAction,
  SetPlayerNameAction,
  GetPlayerListAction,
} from "common/lib/Player";
import { Server } from "socket.io";
import {
  Dice,
  GetRandomDiceAction,
  RevealDiceAction,
  SetRandomDiceAction,
} from "common/lib/Game";

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
  private globalDice: Dice | undefined;
  private activePlayer: ServerPlayer | undefined;
  private lieValue = "";

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

      socket.on(GetRandomDiceAction.type, () => {
        this.globalDice = Dice.createRandomDice();
        socket.emit(
          SetRandomDiceAction.type,
          new SetRandomDiceAction(this.globalDice)
        );
        if (this.globalDice.getDiceValue() === "21") {
          socket.nsp.emit(
            RevealDiceAction.type,
            new RevealDiceAction(this.globalDice)
          );
        }
      });
      socket.on(RevealDiceAction.type, () => {
        if (this.globalDice !== undefined) {
          socket.nsp.emit(
            RevealDiceAction.type,
            new RevealDiceAction(this.globalDice)
          );
        }
      });

      socket.on("reset", () => {
        this.lieValue = "";
        this.id = 0;
        this.allPlayer = [];
        this.globalDice = undefined;
        this.activePlayer = undefined;
        this.broadcastPlayerList(socket);
      });
      socket.on("startGame", () => {
        socket.emit("playersXTurn", this.allPlayer[0], "");
        this.activePlayer = this.allPlayer[0];
      });
      socket.on("getMePlayer", (id: string) => {
        for (let player of this.allPlayer) {
          if (player.socketId == id) {
            socket.emit("setMePlayer", player);
            break;
          }
        }
      });
      socket.on("nextPlayer", (lieValue: string) => {
        this.lieValue = lieValue;

        let length = this.allPlayer.length;

        let lastPlayer = this.activePlayer;
        for (let i = 0; i < length; i++) {
          if (lastPlayer?.id === this.allPlayer[i].id) {
            if (i === length - 1) {
              this.activePlayer = this.allPlayer[0];

              break;
            } else {
              this.activePlayer = this.allPlayer[i + 1];

              break;
            }
          }
        }
        socket.nsp.emit("playersXTurn", this.activePlayer, this.lieValue);
      });
    });
  }

  private addPlayer(setPlayerName: SetPlayerNameAction, socket: Socket): void {
    const player = new ServerPlayer(setPlayerName.name, this.id, socket.id);
    this.id += 1;
    this.allPlayer.push(player);
    socket.emit(SetActivePlayerAction.type, new SetActivePlayerAction(player));
    this.broadcastPlayerList(socket);
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

    this.allPlayer = this.allPlayer.filter(
      (serverPlayer) => serverPlayer.socketId !== socket.id
    );
    this.broadcastPlayerList(socket);
  }
}
