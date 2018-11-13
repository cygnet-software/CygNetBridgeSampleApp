import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPaneComponent } from './point-pane.component';

describe('PointPaneComponent', () => {
  let component: PointPaneComponent;
  let fixture: ComponentFixture<PointPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
