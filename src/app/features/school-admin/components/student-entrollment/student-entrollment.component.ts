import { Component } from '@angular/core';
import { StudentAddComponent } from '../student-add/student-add.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { SchoolService } from '../../../../core/services/school/school.service';
import { AdminService } from '../../../../core/services/Admin/admin.service';
import { tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-entrollment',
  standalone: true,
  imports: [StudentAddComponent, ReactiveFormsModule, NgIf],
  templateUrl: './student-entrollment.component.html',
  styleUrl: './student-entrollment.component.scss',
})
export class StudentEntrollmentComponent {
  activeTab: any = 'basic';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  form: any = FormGroup;
  showOptional = false;
  submitted = false;
  isSubmitting = false;

  classes: any = [];

  academicYears: any = [];

  sections = ['A', 'B', 'C', 'D', 'E', 'F'];

  resultStatuses = ['Promoted', 'Failed', 'Pending', 'Transferred', 'Dropped'];

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.form = this.fb.group({
      student_id: [null, Validators.required],
      class_id: [null, Validators.required],
      academic_year_id: [null, Validators.required],
      roll_number: ['', Validators.required],
      result_status: ['Pending'],
      is_current: [true],
      section: [''],
      enrollment_date: [''],
      completion_date: [''],
      promoted_to_class_id: [''],
    });
    this.GetAllAcademicYears();
    this.GetAllClasses();
    this.GetAllEnrollments();
  }

  toggleOptional() {
    this.showOptional = !this.showOptional;
  }

 

  GetAllClasses() {
    this.adminService
      .GetAllClasses()
      .pipe(
        tap(() => console.log('API call started')), // side effect (logging)
        map((res: any) => res.data || res), // transform the response
        catchError((err) => {
          console.error('Error fetching classes:', err);
          return of([]); // return empty array on error, so app doesn't crash
        })
      )
      .subscribe({
        next: (classes) => {
          console.log('Classes fetched:', classes);
          this.classes = classes;
        },
        complete: () => console.log('API call completed'),
      });
  }
  GetAllAcademicYears() {
    this.adminService.GetAllAcademicYear().subscribe((res: any) => {
      console.log(res, 'academic year data ');
      if (res.status == 'error') {
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      }
      this.academicYears = res.data.data;
    });
  }
  submit() {
  this.submitted = true;

  // Stop if form invalid
  if (this.form.invalid) {
    console.warn('❌ Invalid form, please fill required fields.');
    return;
  }

  // Build payload from form
  const academic = {
    student_id: this.form.value.student_id,
    class_id: this.form.value.class_id,
    academic_year_id: this.form.value.academic_year_id,
    roll_number: this.form.value.roll_number,
    result_status: this.form.value.result_status || 'Pending',
    is_current: this.form.value.is_current,
    section: this.form.value.section || null,
    enrollment_date: this.form.value.enrollment_date || null,
    completion_date: this.form.value.completion_date || null,
    promoted_to_class_id: this.form.value.promoted_to_class_id || null
  };

  console.log('📦 Sending to API:', academic);

  // Disable button or show loader
  this.isSubmitting = true;

  this.schoolService.CreateStudentEnrollment(academic).subscribe({
    next: (res: any) => {
      console.log('✅ Enrollment Response:', res);

      // Assuming your API returns status = 'success'
      if (res.status === 'success' || res.success === true) {
        alert('🎉 Student Enrollment Successfully Created!');
        this.form.reset({
          result_status: 'Pending',
          is_current: true
        });
        this.submitted = false;
      } else {
        alert('⚠️ Something went wrong, please check your input.');
      }
    },
    error: (err) => {
      console.error('❌ Enrollment API Error:', err);
      alert('🚨 Failed to create enrollment. Please try again.');
    },
    complete: () => {
      this.isSubmitting = false;
    }
  });
}

  GetAllEnrollments(){
    this.schoolService.GetStudentEnrollments().subscribe((res:any)=>{
      console.log(res,'all enrollments');
    })
  }
}
