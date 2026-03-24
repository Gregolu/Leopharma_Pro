import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then(m => m.RegisterComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./pages/patients/patients-list.component').then(m => m.PatientsListComponent)
      },
      {
        path: 'patients/:id',
        loadComponent: () => import('./pages/patients/patient-detail/patient-detail.component').then(m => m.PatientDetailComponent)
      },
      {
        path: 'reseau',
        loadComponent: () => import('./pages/reseau/reseau').then(m => m.ReseauComponent)
      },
      {
        path: 'analyse',
        loadComponent: () => import('./pages/analyse/analyse').then(m => m.AnalyseComponent)
      },
      {
        path: 'data-verification',
        loadComponent: () => import('./pages/data-verification/data-verification').then(m => m.DataVerificationComponent)
      },
      {
        path: 'exportation',
        loadComponent: () => import('./pages/exportation/exportation').then(m => m.ExportationComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent)
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/auth/login' }
];
