import { InjectionToken } from '@angular/core';
import { NavItem } from '@libs/lib-layouts';

export const APP_MENU = new InjectionToken<NavItem[]>('APP_MENU');

export const MENU: NavItem[] = [
  // {
  //   title: 'System Settings',
  //   path: 'system-settings',
  //   icon: 'settings',
  //   iconSet: 'outlined',
  // },
  {
    title: 'Playground',
    path: 'playground',
    icon: 'playground',
    iconSet: 'outlined',
    children: [
      {
        title: 'Mail Template Editor',
        path: 'playground/mail-template-editor',
        icon: 'stacked_email',
        iconSet: 'outlined',
      },
      {
        title: 'Mail Template Editor V2',
        path: 'playground/mail-template-editor/v2',
        icon: 'stacked_email',
        iconSet: 'outlined',
      },
    ],
  },
];
