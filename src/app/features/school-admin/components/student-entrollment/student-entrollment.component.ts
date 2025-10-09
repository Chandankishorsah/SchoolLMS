import { Component, OnInit } from '@angular/core';
import { StudentAddComponent } from "../student-add/student-add.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map, catchError, of } from 'rxjs';
import { AdminService } from '../../../../core/services/Admin/admin.service';
import { SchoolService } from '../../../../core/services/school/school.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-entrollment',
  standalone: true,
  imports: [StudentAddComponent, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './student-entrollment.component.html',
  styleUrl: './student-entrollment.component.scss',
})
export class StudentEntrollmentComponent implements OnInit {
  activeTab: any = 'basic';
  form!: FormGroup;
  showOptional = false;
  submitted = false;
  isSubmitting = false;

  classes: any[] = [];
  academicYears: any[] = [];
  sections = ['A', 'B', 'C', 'D', 'E', 'F'];
  resultStatuses = ['Promoted', 'Failed', 'Pending', 'Transferred', 'Dropped'];

  studentId: any; // 🔹 Store ID from URL
  enrollmentExists: boolean=false;

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getStudentIdFromUrl();
    this.GetAllAcademicYears();
    this.GetAllClasses();

    if (this.studentId) {
      // If ID exists, pre-fill it in form and load enrollment
      this.form.patchValue({ student_id: this.studentId });
      this.loadEnrollmentById(this.studentId);
    }

    this.GetAllEnrollments();
  }

  // 🔹 Initialize Form
  initForm() {
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
      promoted_to_class_id: ['']
    });
  }


  getStudentIdFromUrl() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('student_id');
      console.log('🔍 student_id from URL:', idParam);
      if (idParam) {
        this.studentId = Number(idParam);
        this.form.patchValue({ student_id: this.studentId });
        console.log('📘 Student ID from URL:', this.studentId);
      }
    });
  }

  // 🔹 Load Enrollment Data
  loadEnrollmentById(id: number) {
    this.schoolService.GetstudentEnrollmentById(id).subscribe({
      next: (res: any) => {
        console.log('📋 Enrollment Data:', res);
        if (res && res.data) {
          this.form.patchValue(res.data); // auto-fill
          this.enrollmentExists = true;
        }
      },
      error: (err) => console.error('❌ Error loading enrollment:', err)
    });
  }

  toggleOptional() {
    this.showOptional = !this.showOptional;
  }

  GetAllClasses() {
    this.adminService
      .GetAllClasses()
      .pipe(
        tap(() => console.log('API call started')),
        map((res: any) => res.data || res),
        catchError((err) => {
          console.error('Error fetching classes:', err);
          return of([]);
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
      console.log(res, 'academic year data');
      if (res.status == 'error') {
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      }
      this.academicYears = res.data.data;
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      console.warn('❌ Invalid form, please fill required fields.');
      return;
    }

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
      promoted_to_class_id: this.form.value.promoted_to_class_id || null,
    };

    console.log('📦 Sending to API:', academic);
    this.isSubmitting = true;
if (this.enrollmentExists) {
    // 🔹 Update existing enrollment
    this.schoolService.UpdateStudentEnrollment(academic, this.form.value.student_id).subscribe({
      next: (res: any) => {
        console.log('✅ Enrollment updated:', res);
        alert('🎉 Student Enrollment Successfully Updated!');
      },
      error: (err) => {
        console.error('❌ Update failed:', err);
        alert('🚨 Failed to update enrollment.');
      },
      complete: () => this.isSubmitting = false
    });
  } else {
    // 🔹 Create new enrollment
    this.schoolService.CreateStudentEnrollment(academic).subscribe({
      next: (res: any) => {
        console.log('✅ Enrollment Response:', res);
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
    
  }

  GetAllEnrollments() {
    this.schoolService.GetStudentEnrollments().subscribe((res: any) => {
      console.log(res, 'all enrollments');
    });
  }

  // 🔹 Change Active Tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  onStudentCreated(id: number) {
    console.log('🆕 Student added with ID:', id);
    this.studentId = id;  // for further steps
    this.form.patchValue({ student_id: id });
    this.activeTab = 'academic';
    this.activeTab = 'academic';
    this.setActiveTab('academic')
  }

  onStudentUpdated(id: number) {
    this.studentId = id;
    this.form.patchValue({ student_id: id });
    this.activeTab = 'academic';
    this.setActiveTab('academic')


    console.log('✅ Student updated with ID:', id);
  }

}
