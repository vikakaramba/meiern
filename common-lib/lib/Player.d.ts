export declare class Player {
    name: string;
    id: number | null;
    constructor(name: string, id?: number | null);
}
export declare class SetPlayerNameAction {
    readonly name: string;
    static readonly type = "[Player] Set Player Name";
    constructor(name: string);
}
/**
 * Socket response for SetPlayerName
 * Contains Player object for new Player
 */
export declare class SetActivePlayerAction {
    readonly player: Player;
    static readonly type = "[Player] Set Active Player";
    constructor(player: Player);
}
export declare class SetPlayerListAction {
    readonly players: Player[];
    static readonly type = "[Player] Set List of all Players";
    constructor(players: Player[]);
}
//# sourceMappingURL=Player.d.ts.map