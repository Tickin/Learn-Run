import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VdiComponent } from './vdi.component';

describe('VdiComponent', () => {
  let component: VdiComponent;
  let fixture: ComponentFixture<VdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
