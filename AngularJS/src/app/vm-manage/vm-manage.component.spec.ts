import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmManageComponent } from './vm-manage.component';

describe('VmManageComponent', () => {
  let component: VmManageComponent;
  let fixture: ComponentFixture<VmManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
