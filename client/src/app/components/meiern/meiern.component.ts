import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import {
  Dice,
  GetRandomDiceAction,
  RevealDiceAction,
  SetRandomDiceAction,
} from 'common/lib/Game';
// @ts-ignore
import rollADie from 'roll-a-die';
import { Player } from 'common/lib/Player';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meiern',
  templateUrl: './meiern.component.html',
  styleUrls: ['./meiern.component.scss'],
})
export class MeiernComponent implements OnInit {
  @ViewChild('diceContainer')
  public diceContainer: ElementRef | undefined;

  public dice: Dice | undefined;
  private mePlayer: Player | undefined;
  myTurn = false;
  lie = '';
  diceRollCount = 0;

  constructor(
    private readonly socketService: SocketService,
    private snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    socketService.getSocket().on('setMePlayer', (player: Player) => {
      this.mePlayer = player;
    });

    socketService
      .getSocket()
      .on(RevealDiceAction.type, (revealDiceAction: RevealDiceAction) => {
        this.diceRollCount = 0;
        this.rollDice(Dice.copy(revealDiceAction.dice));
        this.snackBar.open('Es wurde aufgedeckt', 'Ok', { duration: 10000 });
      });
    socketService
      .getSocket()
      .on(
        SetRandomDiceAction.type,
        (setRandomDiceAction: SetRandomDiceAction) => {
          this.rollDice(Dice.copy(setRandomDiceAction.dice));
        }
      );

    socketService
      .getSocket()
      .on('playersXTurn', (aktivePlayer: Player, lieValue: string) => {
        this.lie = '';
        this.lie = lieValue;
        this.dice = undefined;

        if (aktivePlayer.id === this.mePlayer?.id) {
          if (this.diceContainer) {
            this.diceContainer.nativeElement.innerHTML = '';
          }
          this.diceRollCount = 0;
          this.myTurn = true;
        }
      });
  }

  ngOnInit(): void {
    this.socketService
      .getSocket()
      .emit('getMePlayer', this.socketService.getSocket().id);
    this.socketService.getSocket().emit('startGame');
  }

  private rollDice(dice: Dice) {
    this.dice = dice;
    rollADie({
      element: this.diceContainer?.nativeElement,
      numberOfDice: 2,
      values: [dice.firstDice, dice.secondDice],
      delay: 100000000,
      callback: (value: any) => console.log(),
    });
  }

  public getDice(): void {
    this.socketService.getSocket().emit(GetRandomDiceAction.type);
    this.diceRollCount++;
  }

  nextPlayer(value: string) {
    this.myTurn = false;
    this.diceRollCount = 0;
    if (this.diceContainer) {
      this.diceContainer.nativeElement.innerHTML = '';
    }

    this.socketService.getSocket().emit('nextPlayer', value);
  }

  revealDice() {
    this.socketService.getSocket().emit(RevealDiceAction.type);
  }

  back() {
    this.router.navigate(['']);
  }

  public isHiddenDiceThrow(): boolean {
    return this.diceRollCount >= 2;
  }

  public getNextCallValue(): string {
    if (
      !this.isHiddenDiceThrow() &&
      Number(this.dice?.getDiceValue()) > Number(this.lie)
    ) {
      return this.dice?.getDiceValue() ?? this.lie;
    } else {
      return new Dice(Number(this.lie.charAt(0)), Number(this.lie.charAt(1)))
        .getNextHigherValue()
        .getDiceValue();
    }
  }
}
