import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { StudentAddComponent } from '../student-add/student-add.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService } from '../../../../core/services/school/school.service';
import { StudentEditComponent } from '../student-edit/student-edit.component';
declare var bootstrap:any
interface Student {
  id: number;
  name: string;
  grade: string;
  parent: string;
  feesStatus: 'Paid' | 'Unpaid' | 'Partial';
}
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule,StudentAddComponent,StudentEditComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
students: any=[];
  constructor(private router:Router,private route: ActivatedRoute,private schoolService:SchoolService) {

  }
     currentModalContent: 'addStudent' | 'editStudent' | null = null;

  openModal(content: 'addStudent' | 'editStudent') {
    this.currentModalContent = content;

    const modalEl = document.getElementById('dynamicModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  closeModal() {
    const modalEl = document.getElementById('dynamicModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
    this.currentModalContent = null;
  }
  GetAllStudents() {
    this.schoolService.getAllStudents().subscribe((res:any)=>{
      console.log('All Students:', res);  
      this.students = res.data.data;   }
    )
  }
  ngOnInit(): void {
    this.GetAllStudents()
  }
AddStudents() {
  this.router.navigate(['../student-add'], { 
    relativeTo: this.route,
    replaceUrl: true
  });
}
EditStudents() {
  this.router.navigate(['../student-edit'], { 
    relativeTo: this.route,
    replaceUrl: true
  });
}
}
