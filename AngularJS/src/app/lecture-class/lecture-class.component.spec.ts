import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureClassComponent } from './lecture-class.component';

describe('LectureClassComponent', () => {
  let component: LectureClassComponent;
  let fixture: ComponentFixture<LectureClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
