export class PlayerAction {
  static readonly type = '[Player] Add item';
  constructor(public payload: string) {}
}
