import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/shell/shell.component').then((c) => c.ShellComponent),
    title: 'System Settings',
    data: {
      subTitle: 'Manage system configuration',
      component: () =>
        import('./ui/actions/actions.component').then(
          (c) => c.ActionsViewComponent
        ),
    },
  },
];
