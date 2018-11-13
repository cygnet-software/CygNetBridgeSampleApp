import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesFilterTagComponent } from './facilities-filter-tag.component';

describe('FacilitiesFilterTagComponent', () => {
  let component: FacilitiesFilterTagComponent;
  let fixture: ComponentFixture<FacilitiesFilterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesFilterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesFilterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
