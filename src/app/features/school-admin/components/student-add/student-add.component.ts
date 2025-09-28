import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../../core/services/Admin/admin.service';
import { SchoolService } from '../../../../core/services/school/school.service';
import { tap, map, catchError, of } from 'rxjs';
import { DataService } from '../../../../core/services/data/data.service';
import { Students } from '../../../../core/models/school.model';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.scss',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query('.form-group', [
          style({ transform: 'translateX(-100px)', opacity: 0 }),
          stagger(100, [
            animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hovered', animate('200ms ease-in-out'))
    ])
  ]
})
export class StudentAddComponent {
  currentuser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');

  studentForm: any = FormGroup;
  isSubmitting = false;
  showSuccess = false;
  currentStep = 1;
  totalSteps = 2;
  buttonState = 'normal';

  classes = [
    'Kindergarten', 'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9',
    'Class 10', 'Class 11', 'Class 12'
  ];
// classes:any=[]
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  states: any = [];
  cities: any = [];

  constructor(private fb: FormBuilder, private router: Router,
    private adminService: AdminService, private schoolService: SchoolService,
    private dataService: DataService
  ) {
    this.studentForm = this.fb.group({
      // Personal Information
      name: ['', [Validators.required, Validators.minLength(2)]],

      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      photo: [''],

      // Academic Information
      // studentId: ['', Validators.required],
      class: ['', Validators.required],
      // section: ['', [Validators.pattern('^[A-Z]$')]],
      // rollNumber: ['',],
      // admissionDate: ['',],
      // previousSchool: [''],

      // Contact Information
      email: ['', [Validators.email]],
      primary_mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsapp_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      secondary_mobile_number: ['', [Validators.pattern('^[0-9]{10}$')]],

      full_address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

      // Parent/Guardian Information
      father_name: ['', Validators.required],
      mother_name: ['', Validators.required],
      local_guardian_name: ['', Validators.required],

      // parentOccupation: [''],
      // emergencyContact: ['', [Validators.pattern('^[0-9]{10}$')]],

      // Fee Information
      // feeCategory: ['Regular', Validators.required],
      // scholarship: [false],
      // scholarshipPercentage: [0],
      // transportFacility: [false],
      // hostelFacility: [false]
    });
  }

  ngOnInit(): void {
    // Auto-generate student ID
    // this.generateStudentId();
    // this.GetAllClasses()
    this.GetAllstate()
  }

  generateStudentId(): void {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.studentForm.patchValue({
      studentId: `STU${year}${randomNum}`
    });
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

 


  markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.studentForm.patchValue({ photo: file });
    }
  }

  onMouseEnter(): void {
    this.buttonState = 'hovered';
  }

  onMouseLeave(): void {
    this.buttonState = 'normal';
  }
  GetAllClasses() {
    this.adminService.GetAllClasses().pipe(
      tap(() => console.log("API call started")),   // side effect (logging)
      map((res: any) => res.data || res),           // transform the response
      catchError((err) => {
        console.error("Error fetching classes:", err);
        return of([]); // return empty array on error, so app doesn't crash
      })
    ).subscribe({
      next: (classes) => {
        console.log("Classes fetched:", classes);
        this.classes = classes;
      },
      complete: () => console.log("API call completed")
    });
  }

  GetAllstate() {
    this.dataService.GetAllSates().subscribe((res: any) => {
      console.log(res, "state data ")
      this.states = res;
    })
  }
  onStateChange(event: any) {
    const selectedOption = event.target.selectedOptions[0];
    const stateCode = selectedOption.getAttribute('data-code'); // API ke liye
    const stateName = event.target.value; // Form ke liye (ye save hoga)

    if (stateCode) {
      this.GetCity(stateCode);
    }
  }

  GetCity(stateCode: string) {
    this.dataService.GetAllCities(stateCode).subscribe((res: any) => {
      this.cities = res;
    });
  }

   onSubmit(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      // setTimeout(() => {
      //   this.isSubmitting = false;
      //   this.showSuccess = true;

      //   // Reset form after success
      //   setTimeout(() => {
      //     this.showSuccess = false;
      //     this.studentForm.reset();
      //     this.currentStep = 1;
      //     this.generateStudentId();
      //   }, 3000);
      // }, 2000);
      this.addStudent()
    } else {
      this.markFormGroupTouched();
    }
  }

  addStudent() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const Addrees = this.studentForm.get('state')?.value + ' ' + this.studentForm.get('city')?.value + ' ' + this.studentForm.get('full_address').value;
    const dob = this.studentForm.get('date_of_birth')?.value
    const student: Students = {
      name: this.studentForm.get('name')?.value,
      date_of_birth: dob,
      full_address: Addrees,
      school_id: Number(this.currentuser.schoolId),


      gender: this.studentForm.get('gender').value,
      father_name: this.studentForm.get('father_name').value,
      mother_name: this.studentForm.get('mother_name').value,
      local_guardian_name: this.studentForm.get('local_guardian_name').value,
      primary_mobile_number: this.studentForm.get('primary_mobile_number').value,
      secondary_mobile_number: this.studentForm.get('secondary_mobile_number').value,
      whatsapp_number: this.studentForm.get('whatsapp_number').value,
      email: this.studentForm.get('email').value,
    };
console.log(student,"students")
// return
    this.schoolService.addStudent(student).subscribe({
      next: (res: any) => {
        console.log('Student added successfully:', res);
        this.studentForm.reset();
        if(res.status=='error'){
          localStorage.clear();
          window.location.href=''
        }
      },
      error: (err: any) => {

      }
    });
  }
  OnPinChange(){
    this.studentForm.get('full_address').value=this.studentForm.get('state').value+' '+this.studentForm.get('city').value+' '+
    this.studentForm.get('pincode').value

  }
}
