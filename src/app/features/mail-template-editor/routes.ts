import { Routes } from '@angular/router';
import { Store } from './data-access';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/shell/shell.component').then((c) => c.ShellComponent),
    title: 'Mail Template Editor',
    data: {
      subTitle: 'Create localized email templates',
      component: () =>
        import('./features/actions/actions.component').then(
          (c) => c.ActionsComponent
        ),
    },
  },
  {
    path: 'v2',
    loadComponent: () =>
      import('./features/shell-v2/shell.component').then(
        (c) => c.ShellComponent
      ),
    title: 'Mail Template Editor V2',
    data: {
      subTitle: 'Create localized email templates',

      component: () =>
        import('./features/actions-v2/actions.component').then(
          (c) => c.ActionsComponent
        ),
    },
    providers: [Store],
  },
];
