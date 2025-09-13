import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@shared/ui/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [],
    children: [
      {
        path: 'system-settings',
        loadChildren: () =>
          import('@features/system-settings').then((r) => r.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth').then((r) => r.routes),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
