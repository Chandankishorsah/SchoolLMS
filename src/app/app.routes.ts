import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    // canActivate: [authGuard
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'super-admin',
        // loadChildren: () => import('./features/super-admin/super-admin.routes').then(m => m.routes),
        loadChildren: () =>
          import('./features/super-admin/super-admin.routes').then(
            (m) => m.routes
          ),
        // canActivate: [authGuard],
      },
      //   {
      //     path: 'school-admin',
      //     loadChildren: () => import('./features/school-admin/school-admin.routes').then(m => m.routes),
      //     canActivate: [authGuard]
      //   },
      //   {
      //     path: 'parent',
      //     loadChildren: () => import('./features/parent/parent.routes').then(m => m.routes),
      //     canActivate: [authGuard]
      //   }
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
