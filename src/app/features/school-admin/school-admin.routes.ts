import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';

export const schoolAdminRoutes: Routes = [
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
        path: 'students', component: StudentsComponent

    },
    {
        path: 'fees', loadComponent: () => import('./fees/fees.component').then(m => m.FeesComponent)
    },
    {
        path: 'settings', loadComponent: () => import('./settings/school-admin-settings/school-admin-settings.component').then(m => m.SchoolAdminSettingsComponent)
    }



];