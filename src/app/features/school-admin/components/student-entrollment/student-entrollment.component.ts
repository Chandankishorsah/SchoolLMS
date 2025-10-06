import { Component } from '@angular/core';

@Component({
  selector: 'app-student-entrollment',
  standalone: true,
  imports: [],
  templateUrl: './student-entrollment.component.html',
  styleUrl: './student-entrollment.component.scss'
})
export class StudentEntrollmentComponent {
 activeTab = 'home';

  setTab(tab: string) {
    this.activeTab = tab;
}
}
