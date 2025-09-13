import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../../../../../core/services/data/data.service';

@Component({
  selector: 'app-schools-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  styleUrl: './schools-add.component.scss',
  templateUrl: './schools-add.component.html',
 

})
export class SchoolsAddComponent {
  schoolForm:any= FormGroup;
  isSubmitted = false;
  states: any;
  showPassword = false;
  isLoading = false;
  showSuccessOverlay = false;
  selectedFileName = '';
  formProgress = 0;
  buttonState = 'normal';
  shakeState = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.schoolForm = this.fb.group({
      schoolName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\s]+$/)],
      ],
      logo: [null, Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      state: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      principalName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      domain: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}?$/
          ),
        ],
      ],
    });

    this.loadStates();
    this.setupFormProgressTracking();
  }

  setupFormProgressTracking() {
    this.schoolForm.valueChanges.subscribe(() => {
      this.updateFormProgress();
    });
  }

  updateFormProgress() {
    const totalFields = Object.keys(this.schoolForm.controls).length;
    let filledFields = 0;
    
    Object.keys(this.schoolForm.controls).forEach(key => {
      const control = this.schoolForm.get(key);
      if (control && control.value && control.valid) {
        filledFields++;
      }
    });
    
    this.formProgress = Math.round((filledFields / totalFields) * 100);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loadStates() {
    this.dataService.GetAllSates().subscribe((res: any) => {
      console.log(res);
      this.states = res;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.schoolForm.patchValue({ logo: file });
    }
  }

  get f() {
    return this.schoolForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    
    if (this.schoolForm.invalid) {
      this.shakeState = 'shake';
      setTimeout(() => this.shakeState = '', 600);
      return;
    }

    this.isLoading = true;
    this.buttonState = 'loading';

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.buttonState = 'success';
      this.showSuccessOverlay = true;
      
      console.log('New School Data:', this.schoolForm.value);
    }, 2000);
  }

  onSuccessAnimationDone() {
    setTimeout(() => {
      this.showSuccessOverlay = false;
      this.buttonState = 'normal';
      this.schoolForm.reset();
      this.isSubmitted = false;
      this.selectedFileName = '';
      this.formProgress = 0;
    }, 2000);
  }
}