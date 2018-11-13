import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPropertyComponent } from './point-property.component';

describe('PointPropertyComponent', () => {
  let component: PointPropertyComponent;
  let fixture: ComponentFixture<PointPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
