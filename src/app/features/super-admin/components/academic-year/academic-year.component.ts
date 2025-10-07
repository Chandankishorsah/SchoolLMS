import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../core/services/Admin/admin.service';
import { NgFor, NgIf } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-academic-year',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './academic-year.component.html',
  styleUrl: './academic-year.component.scss'
})
export class AcademicYearComponent {
 classes: any[] = [];
  classList: string[] = [];
  classForm:any= FormGroup;
  editIndex: number | null = null;
  schools: any=[];

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.initForm();

  }

  ngOnInit(): void {
    // load data from API on component init
  }
getAllSchools() {
    this.adminService.GetAllSchools().subscribe({
      next: (response: any) => {
        console.log('Fetched schools:', response);
        this.schools = response.data.data; // Assuming the API returns an array of schools in response.data
      },
      error: (error) => {
        console.error('Error fetching schools:', error);
      },
    });
  }
  initForm() {
    this.classForm = this.fb.group({
      schoolId: ['', [Validators.required]],

      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.classList = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
    this.getAllSchools();
    this.getAllClasses(); 
  }

  openModal() {
    this.editIndex = null;
    this.classForm.reset({ name: '' });
    const modal = new bootstrap.Modal(document.getElementById('classModal'));
    modal.show();
  }

  editClass(index: number) {
    this.adminService.GetClassById(index).subscribe((res:any)=>{
      console.log(res,'class by id')
    })
    this.editIndex = index;
    this.classForm.patchValue(this.classes[index]);
    const modal = new bootstrap.Modal(document.getElementById('classModal'));
    modal.show();
  }

  saveClass() {
    if (this.classForm.invalid) return;

    const formValue = this.classForm.value;

    if (this.editIndex !== null) {
      // Update existing class
      const classToUpdate = this.classes[this.editIndex];
      this.updateClass(classToUpdate.id, formValue);
    } else {
      // Create new class
      this.createClass();
    }
  }

  createClass() {
    const data:any={
      schoolId:Number( this.classForm.get('schoolId')?.value),
      name:this.classForm.get('name')?.value
    }
    this.adminService.CreateClass(data).subscribe({
      next: (created: any) => {
        this.classes.push(created);
        this.closeModal();
      },
      error: (err) => console.error('Create failed', err)
    });
  }

  updateClass(id: number, formValue: any) {
    this.adminService.UpdateClass(id, formValue).subscribe({
      next: () => {
        this.getAllClasses();
        this.closeModal();
      },
      error: (err) => console.error('Update failed', err)
    });
  }



  getAllClasses() {
    this.adminService.GetAllClasses().subscribe({
      next: (res: any) => {
        this.classes = res.data;
      },
      error: (err) => console.error('GetAllClasses failed', err)
    });
  }

  getClassById(id: number) {
    this.adminService.GetClassById(id).subscribe({
      next: (res) => console.log('Single class:', res),
      error: (err) => console.error('GetClassById failed', err)
    });
  }

  closeModal() {
    const modalEl = document.getElementById('classModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
