export declare class Player {
    name: string;
    id: number | null;
    constructor(name: string, id?: number | null);
}
export declare class SetPlayerNameAction {
    readonly name: string;
    static readonly type: string;
    constructor(name: string);
}
/**
 * Socket response for SetPlayerName
 * Contains Player object for new Player
 */
export declare class SetActivePlayerAction {
    readonly player: Player;
    static readonly type: string;
    constructor(player: Player);
}
export declare class SetPlayerListAction {
    readonly players: Player[];
    static readonly type: string;
    constructor(players: Player[]);
}
export declare class GetPlayerListAction {
    static readonly type: string;
}
//# sourceMappingURL=Player.d.ts.map