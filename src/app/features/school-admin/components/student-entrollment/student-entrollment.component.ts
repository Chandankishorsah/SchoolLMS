import { Component } from '@angular/core';
import { StudentAddComponent } from "../student-add/student-add.component";

@Component({
  selector: 'app-student-entrollment',
  standalone: true,
  imports: [StudentAddComponent],
  templateUrl: './student-entrollment.component.html',
  styleUrl: './student-entrollment.component.scss'
})
export class StudentEntrollmentComponent {
 activeTab = 'home';

  setTab(tab: string) {
    this.activeTab = tab;
}
}
