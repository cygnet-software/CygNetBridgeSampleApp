import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPaneComponent } from './group-pane.component';

describe('GroupPaneComponent', () => {
  let component: GroupPaneComponent;
  let fixture: ComponentFixture<GroupPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
