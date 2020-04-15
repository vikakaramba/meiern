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

@Component({
  selector: 'app-meiern',
  templateUrl: './meiern.component.html',
  styleUrls: ['./meiern.component.scss'],
})
export class MeiernComponent implements OnInit {
  @ViewChild('diceContainer')
  public container: ElementRef | undefined;

  public dice: Dice | undefined;

  constructor(private readonly socketService: SocketService) {
    socketService
      .getSocket()
      .on(RevealDiceAction.type, (revealDiceAction: RevealDiceAction) => {
        this.rollDice(Dice.copy(revealDiceAction.dice));
      });
    socketService
      .getSocket()
      .on(
        SetRandomDiceAction.type,
        (setRandomDiceAction: SetRandomDiceAction) => {
          this.rollDice(Dice.copy(setRandomDiceAction.dice));
        }
      );
  }

  ngOnInit(): void {}

  private rollDice(dice: Dice) {
    console.log(rollADie);
    this.dice = dice;
    rollADie({
      element: this.container?.nativeElement,
      numberOfDice: 2,
      values: [dice.firstDice, dice.secondDice],
      delay: 100000000,
      callback: (value: any) => console.log(value),
    });
  }

  public getDice(): void {
    this.socketService.getSocket().emit(GetRandomDiceAction.type);
  }
}
