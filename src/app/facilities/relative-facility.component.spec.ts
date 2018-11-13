import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeFacilityComponent } from './relative-facility.component';

describe('RelativeFacilityComponent', () => {
  let component: RelativeFacilityComponent;
  let fixture: ComponentFixture<RelativeFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
