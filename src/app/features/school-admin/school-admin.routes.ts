import { Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { StudentAddComponent } from './components/student-add/student-add.component';


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
        path: 'students', component: StudentsComponent

    },
    {
        path: 'fees', loadComponent: () => import('./components/fees/fees.component').then(m => m.FeesComponent)
    },
    {
        path: 'settings', loadComponent: () => import('./components/settings/school-admin-settings/school-admin-settings.component').then(m => m.SchoolAdminSettingsComponent)
    },
    {
        path: 'student-add',component:StudentAddComponent
    }



];