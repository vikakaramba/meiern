import { State, Action, StateContext } from '@ngxs/store';
import { PlayerAction } from './player.actions';
import produce from 'immer';
import { Injectable } from '@angular/core';

export class PlayerStateModel {
  public items: string[] = [];
}

@State<PlayerStateModel>({
  name: 'player',
  defaults: {
    items: [],
  },
})
@Injectable()
export class PlayerState {
  @Action(PlayerAction)
  add(ctx: StateContext<PlayerStateModel>, action: PlayerAction) {
    const state = ctx.getState();

    ctx.setState(
      produce(ctx.getState(), (draft) => {
        draft.items.push(action.payload);
      })
    );
  }
}
