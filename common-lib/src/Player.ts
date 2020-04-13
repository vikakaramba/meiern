export class Player {
  public name: string;
  public id: number | null;

  constructor(name: string, id: number | null = null) {
    this.name = name;
    this.id = id;
  }
}

const playerType: string = "[Player]";

export class SetPlayerNameAction {
  public static readonly type = `${playerType} Set Player Name`;

  constructor(public readonly name: string) {}
}

/**
 * Socket response for SetPlayerName
 * Contains Player object for new Player
 */
export class SetActivePlayerAction {
  public static readonly type = `${playerType} Set Active Player`;

  constructor(public readonly player: Player) {}
}

export class SetPlayerListAction {
  public static readonly type = `${playerType} Set List of all Players`;

  constructor(public readonly players: Player[]) {}
}

export class GetPlayerListAction {
  public static readonly type = `${playerType} Get List of all Players`;
}
