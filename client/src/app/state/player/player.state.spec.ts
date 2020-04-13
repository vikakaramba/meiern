import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PlayerState, PlayerStateModel } from './player.state';
import {
  Player,
  SetActivePlayerAction,
  SetPlayerListAction,
  SetPlayerNameAction,
} from 'common/lib/Player';
import Socket = SocketIOClient.Socket;
import { SocketService } from '../../service/socket.service';
import SpyObj = jasmine.SpyObj;
import { EventEmitter } from '@angular/core';

describe('Player actions', () => {
  let socketMock: SpyObj<Socket>;
  let store: Store;

  beforeEach(async(() => {
    socketMock = jasmine.createSpyObj<Socket>('Socket', ['emit', 'on']);
    const socketServiceMock = {
      getSocket: (): Socket => {
        return socketMock;
      },
    };
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PlayerState])],
      providers: [{ provide: SocketService, use: socketServiceMock }],
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should set Active Player', () => {
    const testPlayer: Player = new Player('test', 1);
    store.dispatch(new SetActivePlayerAction(testPlayer));
    const player: Player | null = store.selectSnapshot(
      (state) => (state.player as PlayerStateModel).myPlayer
    );
    expect(player).toEqual(testPlayer);
  });

  it('should only set Name if not already set', () => {
    const testPlayer: Player = new Player('test', 1);
    store.dispatch(new SetActivePlayerAction(testPlayer));
    store.dispatch(new SetPlayerNameAction('test'));
    expect(socketMock.emit).toHaveBeenCalled();
  });

  it('should set Player and Player List', fakeAsync(() => {
    const testPlayer: Player = new Player('test', 1);
    store.dispatch(new SetPlayerNameAction(testPlayer.name));
    tick(100);
    expect(socketMock.emit).toHaveBeenCalled();
    expect(socketMock.emit.calls.mostRecent().args).toBe(
      SetPlayerNameAction.type,
      testPlayer.name
    );
  }));
});
