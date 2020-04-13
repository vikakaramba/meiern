export class GameAction {
  static readonly type = '[Game] Add item';
  constructor(public payload: string) { }
}
