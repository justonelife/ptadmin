import { Routes } from '@angular/router';

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
];
