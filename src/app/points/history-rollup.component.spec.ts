import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRollupComponent } from './history-rollup.component';

describe('HistoryRollupComponent', () => {
  let component: HistoryRollupComponent;
  let fixture: ComponentFixture<HistoryRollupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRollupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRollupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
