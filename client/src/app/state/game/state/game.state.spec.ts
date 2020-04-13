import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from './game.state';
import { GameAction } from './game.actions';

describe('Game actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new GameAction('item-1'));
    store.select(state => state.game.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });

});
