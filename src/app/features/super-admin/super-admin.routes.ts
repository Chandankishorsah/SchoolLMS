import { Routes } from '@angular/router';

export const superAdminRoutes: Routes = [
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
    path: 'schools',
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'manager',
        loadComponent: () =>
          import('./components/school/schools-manager/schools-manager.component').then(
            (m) => m.SchoolsManagerComponent
          ),
      },
      {
        path: 'all',
        loadComponent: () =>
          import('./components/school/schools-all/schools-all.component').then(
            (m) => m.SchoolsAllComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/school/schools-add/schools-add.component').then(
            (m) => m.SchoolsAddComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./components/school/schools-edit/schools-edit.component').then(
            (m) => m.SchoolsEditComponent
          ),
      },
      {
        path:'class',loadComponent:()=>import('./components/school/class/class.component').then((m)=>m.ClassComponent),
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
  },
 
];