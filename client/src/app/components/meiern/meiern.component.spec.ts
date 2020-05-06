import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeiernComponent } from './meiern.component';

describe('MeiernComponent', () => {
  let component: MeiernComponent;
  let fixture: ComponentFixture<MeiernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeiernComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeiernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
