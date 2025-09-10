import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../../core/services/data/data.service';

@Component({
  selector: 'app-schools-add',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './schools-add.component.html',
  styleUrl: './schools-add.component.scss'
})
export class SchoolsAddComponent {
schoolForm:any= FormGroup;
  isSubmitted = false;
  states: any;

  constructor(private fb: FormBuilder,private dataService:DataService) {
    this.schoolForm = this.fb.group({
      schoolName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      principalName: ['', Validators.required]
    });
    this.loadStates();

  }
loadStates(){
  this.dataService.GetAllSates().subscribe((res:any)=>{
    console.log(res);
    this.states=res;
    
  })
}
  // Getter for easy access to form fields in template
  get f() {
    return this.schoolForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.schoolForm.invalid) {
      return;
    }

    const newSchool = this.schoolForm.value;
    console.log('New School Data:', newSchool);

    // TODO: Call your API service to save school
    // this.schoolService.addSchool(newSchool).subscribe(res => {
    //   console.log("School added successfully", res);
    // });

    alert('School added successfully!');
    this.schoolForm.reset();
    this.isSubmitted = false;
  }
}
