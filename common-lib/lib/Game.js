"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dice = /** @class */ (function () {
    function Dice(firstDice, secondDice) {
        /**
         * This is always the higher number. This is ensured in the constructor
         */
        this.firstDice = 0;
        this.secondDice = 0;
        if (firstDice >= secondDice) {
            this.firstDice = firstDice;
            this.secondDice = secondDice;
        }
        else {
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
    Dice.prototype.getDiceValue = function () {
        return "" + this.firstDice + this.secondDice;
    };
    Dice.prototype.getNextHigherValue = function () {
        if (this.firstDice === this.secondDice && this.firstDice !== 6) {
            return new Dice(this.firstDice + 1, this.secondDice + 1);
        }
        else if (this.firstDice - this.secondDice === 1) {
            return new Dice(this.firstDice + 1, 1);
        }
        else {
            return new Dice(this.firstDice, this.secondDice + 1);
        }
    };
    Dice.copy = function (dice) {
        return new Dice(dice.firstDice, dice.secondDice);
    };
    Dice.createRandomDice = function () {
        var diceOne = Math.floor(Math.random() * Math.floor(6)) + 1;
        var diceTwo = Math.floor(Math.random() * Math.floor(6)) + 1;
        return new Dice(diceOne, diceTwo);
    };
    return Dice;
}());
exports.Dice = Dice;
var GetRandomDiceAction = /** @class */ (function () {
    function GetRandomDiceAction() {
    }
    GetRandomDiceAction.type = "[Meiern] Get Random dice";
    return GetRandomDiceAction;
}());
exports.GetRandomDiceAction = GetRandomDiceAction;
var SetRandomDiceAction = /** @class */ (function () {
    function SetRandomDiceAction(dice) {
        this.dice = dice;
    }
    SetRandomDiceAction.type = "[Meiern] Set Random dice";
    return SetRandomDiceAction;
}());
exports.SetRandomDiceAction = SetRandomDiceAction;
var RevealDiceAction = /** @class */ (function () {
    function RevealDiceAction(dice) {
        this.dice = dice;
    }
    RevealDiceAction.type = "[Meiern] Reveal dice";
    return RevealDiceAction;
}());
exports.RevealDiceAction = RevealDiceAction;
