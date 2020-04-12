import { State, Action, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { Injectable } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import Socket = SocketIOClient.Socket;
import {
  Player,
  SetActivePlayerAction,
  SetPlayerListAction,
  SetPlayerNameAction,
} from 'common/lib/Player';

export class PlayerStateModel {
  public myPlayer: Player | null = null;
  public players: Player[] = [];
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: new PlayerStateModel(),
})
@Injectable()
export class PlayerState {
  private readonly socket: Socket;

  constructor(socketService: SocketService, private readonly store: Store) {
    this.socket = socketService.getSocket();
    this.socket.on(
      SetActivePlayerAction.type,
      (action: SetActivePlayerAction) => {
        store.dispatch(new SetActivePlayerAction(action.player));
      }
    );
    this.socket.on(
      SetPlayerListAction.type,
      (playerListAction: SetPlayerListAction) => {
        console.log(playerListAction);
        this.store.dispatch(new SetPlayerListAction(playerListAction.players));
      }
    );
  }

  @Action(SetPlayerNameAction)
  public setPlayerName(
    ctx: StateContext<PlayerStateModel>,
    action: SetPlayerNameAction
  ): void {
    if (ctx.getState().myPlayer !== null) {
      console.error(
        'Es wurde versucht sich trotz existierendem User anzumelden'
      );
      return;
    }
    this.socket.emit(SetPlayerNameAction.type, action);
  }

  @Action(SetActivePlayerAction)
  public setActivePlayer(
    ctx: StateContext<PlayerStateModel>,
    action: SetActivePlayerAction
  ) {
    const nextPlayerStateModel = produce(ctx.getState(), (draft) => {
      draft.myPlayer = action.player;
    });
    console.log(nextPlayerStateModel);
    ctx.setState(nextPlayerStateModel);
  }

  @Action(SetPlayerListAction)
  public setPlayerList(
    ctx: StateContext<PlayerStateModel>,
    action: SetPlayerListAction
  ) {
    const nextPlayerStateModel = produce(ctx.getState(), (draft) => {
      draft.players = action.players;
    });
    console.log(nextPlayerStateModel);

    ctx.setState(nextPlayerStateModel);
  }
}
