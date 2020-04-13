import { State, Action, StateContext } from '@ngxs/store';
import { GameAction } from './game.actions';

export class GameStateModel {
  public items: string[];
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    items: []
  }
})
export class GameState {
  @Action(GameAction)
  add(ctx: StateContext<GameStateModel>, action: GameAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
