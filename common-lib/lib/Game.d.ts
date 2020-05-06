export declare class Dice {
    /**
     * This is always the higher number. This is ensured in the constructor
     */
    firstDice: number;
    secondDice: number;
    constructor(firstDice: number, secondDice: number);
    getDiceValue(): string;
    getNextHigherValue(): Dice;
    static copy(dice: Dice): Dice;
    static createRandomDice(): Dice;
}
export declare class GetRandomDiceAction {
    static type: string;
}
export declare class SetRandomDiceAction {
    static type: string;
    dice: Dice;
    constructor(dice: Dice);
}
export declare class RevealDiceAction {
    static type: string;
    dice: Dice;
    constructor(dice: Dice);
}
//# sourceMappingURL=Game.d.ts.map