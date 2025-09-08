import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
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
          import('./school/schools-manager/schools-manager.component').then(
            (m) => m.SchoolsManagerComponent
          ),
      },
      {
        path: 'all',
        loadComponent: () =>
          import('./school/schools-all/schools-all.component').then(
            (m) => m.SchoolsAllComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./school/schools-add/schools-add.component').then(
            (m) => m.SchoolsAddComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./school/schools-edit/schools-edit.component').then(
            (m) => m.SchoolsEditComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];