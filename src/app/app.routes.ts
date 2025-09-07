import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@shared/ui/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'system-settings',
        pathMatch: 'full',
      },
      {
        path: 'system-settings',
        loadChildren: () =>
          import('@features/system-settings').then((r) => r.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
