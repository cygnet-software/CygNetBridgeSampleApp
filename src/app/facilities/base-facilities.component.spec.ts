import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFacilitiesComponent } from './base-facilities.component';

describe('BaseFacilitiesComponent', () => {
  let component: BaseFacilitiesComponent;
  let fixture: ComponentFixture<BaseFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
