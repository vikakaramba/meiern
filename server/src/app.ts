import express from "express";
import socketIo from "socket.io";
import { Server } from "http";

class MeiernServer {
  private readonly app: express.Application;

  public readonly io: SocketIO.Server;

  private readonly http: Server;

  private id = 0;

  constructor() {
    this.app = express();
    this.http = new Server(this.app);
    this.http.listen(3000, () => {
      console.log("Listening at :3000...");
    });
    this.io = socketIo(this.http);
    this.initializeHealth();
    this.initializeSocket();
  }

  private initializeHealth() {
    this.app.get("/health", (request, result, next) => {
      result.send("OK");
    });
  }

  private initializeSocket() {
    this.io.onconnection((socket) => {});
  }
}

const app = new MeiernServer();
