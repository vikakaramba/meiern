"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name, id) {
        if (id === void 0) { id = null; }
        this.name = name;
        this.id = id;
    }
    return Player;
}());
exports.Player = Player;
var playerType = "[Player]";
var SetPlayerNameAction = /** @class */ (function () {
    function SetPlayerNameAction(name) {
        this.name = name;
    }
    SetPlayerNameAction.type = playerType + " Set Player Name";
    return SetPlayerNameAction;
}());
exports.SetPlayerNameAction = SetPlayerNameAction;
/**
 * Socket response for SetPlayerName
 * Contains Player object for new Player
 */
var SetActivePlayerAction = /** @class */ (function () {
    function SetActivePlayerAction(player) {
        this.player = player;
    }
    SetActivePlayerAction.type = playerType + " Set Active Player";
    return SetActivePlayerAction;
}());
exports.SetActivePlayerAction = SetActivePlayerAction;
var SetPlayerListAction = /** @class */ (function () {
    function SetPlayerListAction(players) {
        this.players = players;
    }
    SetPlayerListAction.type = playerType + " Set List of all Players";
    return SetPlayerListAction;
}());
exports.SetPlayerListAction = SetPlayerListAction;
var GetPlayerListAction = /** @class */ (function () {
    function GetPlayerListAction() {
    }
    GetPlayerListAction.type = playerType + " Get List of all Players";
    return GetPlayerListAction;
}());
exports.GetPlayerListAction = GetPlayerListAction;
