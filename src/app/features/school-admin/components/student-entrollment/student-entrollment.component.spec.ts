import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntrollmentComponent } from './student-entrollment.component';

describe('StudentEntrollmentComponent', () => {
  let component: StudentEntrollmentComponent;
  let fixture: ComponentFixture<StudentEntrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEntrollmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEntrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
