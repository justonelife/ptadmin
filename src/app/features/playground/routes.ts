import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./features/form/form.component').then(
        (c) => c.PlaygroundFormComponent
      ),
  },
  {
    path: 'mail-template-editor',
    loadComponent: () =>
      import(
        './features/mail-template-editor/mail-template-editor.component'
      ).then((c) => c.MailTemplateEditorComponent),
  },
];
