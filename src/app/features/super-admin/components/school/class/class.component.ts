import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AdminService } from '../../../../../core/services/Admin/admin.service';

declare var bootstrap: any;

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ClassComponent implements OnInit {
  classes: any[] = [];
  classList: string[] = [];
  classForm!: FormGroup;
  editIndex: number | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getAllClasses(); // load data from API on component init
  }

  initForm() {
    this.classForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.classList = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  }

  openModal() {
    this.editIndex = null;
    this.classForm.reset({ name: '' });
    const modal = new bootstrap.Modal(document.getElementById('classModal'));
    modal.show();
  }

  editClass(index: number) {
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
      this.createClass(formValue);
    }
  }

  createClass(formValue: any) {
    this.adminService.CreateClass(formValue).subscribe({
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
        this.classes = res;
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
