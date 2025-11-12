import { Routes } from '@angular/router';
import { UsersService } from './data-access';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    providers: [UsersService],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/list/list.component').then(
            (c) => c.UsersListComponent
          ),
        title: 'Users Management',
        data: {
          subTitle: 'Manage and monitor all users',
        },
      },
    ],
  },
];
