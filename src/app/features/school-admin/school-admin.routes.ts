import { Routes } from '@angular/router';

export const schoolAdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./components/students/students.component').then(
        (m) => m.StudentsComponent
      ),
  },
  {
    path: 'student-add',
    loadComponent: () =>
      import('./components/student-add/student-add.component').then(
        (m) => m.StudentAddComponent
      ),
  },
  {
    path: 'fees',
    loadComponent: () =>
      import('./components/fees/fees.component').then(
        (m) => m.FeesComponent
      ),
  },
  {
    path: 'fee-structure',
    loadComponent: () =>
      import('./components/fee-structure/fee-structure.component').then(
        (m) => m.FeeStructureComponent
      ),

  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/school-admin-settings/school-admin-settings.component').then(
        (m) => m.SchoolAdminSettingsComponent
      ),
  },
  {
  path: 'student-enrollment/:student_id',
  loadComponent: () =>
    import('./components/student-entrollment/student-entrollment.component').then(
      (m) => m.StudentEntrollmentComponent
    ),
},
{
  path: 'student-enrollment',
  loadComponent: () =>
    import('./components/student-entrollment/student-entrollment.component').then(
      (m) => m.StudentEntrollmentComponent
    ),
},

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
