import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGroupsComponent } from './base-groups.component';

describe('BaseGroupsComponent', () => {
  let component: BaseGroupsComponent;
  let fixture: ComponentFixture<BaseGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
