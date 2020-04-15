export class Dice {
  public firstDice: number = 0;
  public secondDice: number = 0;

  constructor(firstDice: number, secondDice: number) {
    this.firstDice = firstDice;
    this.secondDice = secondDice;
  }

  public getDiceValue(): string {
    const numbers: number[] = [this.firstDice, this.secondDice].sort(
      (a, b) => b - a
    );
    return numbers.join("");
  }

  public static copy(dice: Dice): Dice {
    return new Dice(dice.firstDice, dice.secondDice);
  }

  public static createRandomDice(): Dice {
    const diceOne: number = Math.floor(Math.random() * Math.floor(6)) + 1;
    const diceTwo: number = Math.floor(Math.random() * Math.floor(6)) + 1;
    return new Dice(diceOne, diceTwo);
  }
}

export class GetRandomDiceAction {
  public static type = "[Meiern] Get Random dice";
}

export class SetRandomDiceAction {
  public static type = "[Meiern] Set Random dice";

  public dice: Dice;

  constructor(dice: Dice) {
    this.dice = dice;
  }
}

export class RevealDiceAction {
  public static type = "[Meiern] Reveal dice";

  public dice: Dice;

  constructor(dice: Dice) {
    this.dice = dice;
  }
}
