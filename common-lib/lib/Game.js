"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dice = /** @class */ (function () {
    function Dice(firstDice, secondDice) {
        this.firstDice = 0;
        this.secondDice = 0;
        this.firstDice = firstDice;
        this.secondDice = secondDice;
    }
    Dice.prototype.getDiceValue = function () {
        var numbers = [this.firstDice, this.secondDice].sort(function (a, b) { return b - a; });
        return numbers.join("");
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
