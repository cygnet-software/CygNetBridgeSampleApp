import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeLightweightComponent } from './realtime-lightweight.component';

describe('RealtimeLightweightComponent', () => {
  let component: RealtimeLightweightComponent;
  let fixture: ComponentFixture<RealtimeLightweightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeLightweightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeLightweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
