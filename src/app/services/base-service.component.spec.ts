import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseServiceComponent } from './base-service.component';

describe('BaseServiceComponent', () => {
  let component: BaseServiceComponent;
  let fixture: ComponentFixture<BaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
