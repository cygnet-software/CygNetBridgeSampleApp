import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPaneComponent } from './history-pane.component';

describe('HistoryPaneComponent', () => {
  let component: HistoryPaneComponent;
  let fixture: ComponentFixture<HistoryPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
