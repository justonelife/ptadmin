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
        path: 'users',
        loadChildren: () =>
          import('@features/users-management').then((r) => r.routes),
      },
      {
        path: 'system-settings',
        loadChildren: () =>
          import('@features/system-settings').then((r) => r.routes),
      },
      {
        path: 'playground',
        children: [
          {
            path: 'mail-template-editor',
            loadChildren: () =>
              import('@features/mail-template-editor').then((r) => r.routes),
          },
        ],
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
