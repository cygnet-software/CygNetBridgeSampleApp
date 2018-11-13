import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBaseComponent } from './example-base.component';

describe('ExampleBaseComponent', () => {
  let component: ExampleBaseComponent;
  let fixture: ComponentFixture<ExampleBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
