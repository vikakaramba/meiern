export class Player {
  public name: string;
  public id: number | null;

  constructor(name: string, id: number | null = null) {
    this.name = name;
    this.id = id;
  }
}

export class SetPlayerNameAction {
  public static readonly type = "[Player] Set Player Name";

  constructor(public readonly name: string) {}
}

/**
 * Socket response for SetPlayerName
 * Contains Player object for new Player
 */
export class SetActivePlayerAction {
  public static readonly type = "[Player] Set Active Player";

  constructor(public readonly player: Player) {}
}

export class SetPlayerListAction {
  public static readonly type = "[Player] Set List of all Players";

  constructor(public readonly players: Player[]) {}
}
