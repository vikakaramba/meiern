import { Component, OnInit } from '@angular/core';
import { PlayerState, PlayerStateModel } from '../../state/player/player.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Select(PlayerState)
  // Wird automatisch von ngxs zugewiesen
  // @ts-ignore
  public playerState$: Observable<PlayerStateModel>;

  constructor() {}

  ngOnInit(): void {}
}
