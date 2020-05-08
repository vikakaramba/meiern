import { Component, OnInit } from '@angular/core';
import { PlayerState, PlayerStateModel } from '../../state/player/player.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SocketService } from '../../service/socket.service';
import { Player } from 'common/lib/Player';

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
  public activePlayerId: number | null = null;

  constructor(private readonly socketService: SocketService) {
    socketService
      .getSocket()
      .on('playersXTurn', (aktivePlayer: Player, lieValue: string) => {
        this.activePlayerId = aktivePlayer.id;
      });
  }

  ngOnInit(): void {}
}
