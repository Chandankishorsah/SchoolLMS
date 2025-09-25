import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

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
export class ClassComponent {
  classes = [
    { name: 'Class 10', section: 'A', students: 45 },
    { name: 'Class 9', section: 'B', students: 38 }
  ];

  classForm!: FormGroup;
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.classForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      section: ['', [Validators.required, Validators.maxLength(5)]],
      students: [0, [Validators.required, Validators.min(1)]]
    });
  }

  openModal() {
    this.editIndex = null;
    this.classForm.reset({ name: '', section: '', students: 0 });
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

    if (this.editIndex !== null) {
      this.classes[this.editIndex] = this.classForm.value;
    } else {
      this.classes.push(this.classForm.value);
    }
    this.closeModal();
  }

  deleteClass(index: number) {
    this.classes.splice(index, 1);
  }

  closeModal() {
    const modalEl = document.getElementById('classModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
