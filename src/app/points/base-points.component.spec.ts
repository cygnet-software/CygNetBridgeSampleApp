import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePointsComponent } from './base-points.component';

describe('BasePointsComponent', () => {
  let component: BasePointsComponent;
  let fixture: ComponentFixture<BasePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
