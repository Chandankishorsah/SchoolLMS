import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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
studentForm: any=FormGroup;
  isSubmitting = false;
  showSuccess = false;
  currentStep = 1;
  totalSteps = 3;
  buttonState = 'normal';

  classes = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 
    'Grade 10', 'Grade 11', 'Grade 12'
  ];

  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: [''],
      photo: [''],
      
      // Academic Information
      studentId: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', [Validators.required, Validators.pattern('^[A-Z]$')]],
      rollNumber: ['', Validators.required],
      admissionDate: ['', Validators.required],
      previousSchool: [''],
      
      // Contact Information
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      
      // Parent/Guardian Information
      parentName: ['', Validators.required],
      parentPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      parentEmail: ['', [Validators.email]],
      parentOccupation: [''],
      emergencyContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      
      // Fee Information
      feeCategory: ['Regular', Validators.required],
      scholarship: [false],
      scholarshipPercentage: [0],
      transportFacility: [false],
      hostelFacility: [false]
    });
  }

  ngOnInit(): void {
    // Auto-generate student ID
    this.generateStudentId();
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

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        
        // Reset form after success
        setTimeout(() => {
          this.showSuccess = false;
          this.studentForm.reset();
          this.currentStep = 1;
          this.generateStudentId();
        }, 3000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
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
}
