import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PlayerState } from './player.state';
import { PlayerAction } from './player.actions';

describe('Player actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PlayerState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new PlayerAction('item-1'));
    store
      .select((state) => state.player.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
