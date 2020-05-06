export class Dice {
  /**
   * This is always the higher number. This is ensured in the constructor
   */
  public firstDice: number = 0;
  public secondDice: number = 0;

  constructor(firstDice: number, secondDice: number) {
    if (firstDice >= secondDice) {
      this.firstDice = firstDice;
      this.secondDice = secondDice;
    } else {
      this.secondDice = firstDice;
      this.firstDice = secondDice;
    }
    if (this.firstDice > 6) {
      this.firstDice = 6;
    }
    if (this.secondDice > 6) {
      this.secondDice = 6;
    }
  }

  public getDiceValue(): string {
    return `${this.firstDice}${this.secondDice}`;
  }

  public getNextHigherValue(): Dice {
    if (this.firstDice === this.secondDice && this.firstDice !== 6) {
      return new Dice(this.firstDice + 1, this.secondDice + 1);
    } else if (this.firstDice - this.secondDice === 1) {
      return new Dice(this.firstDice + 1, 1);
    } else {
      return new Dice(this.firstDice, this.secondDice + 1);
    }
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
