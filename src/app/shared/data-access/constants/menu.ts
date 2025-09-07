import { InjectionToken } from '@angular/core';
import { NavItem } from '@libs/lib-layouts';

export const APP_MENU = new InjectionToken<NavItem[]>('APP_MENU');

export const MENU: NavItem[] = [
  {
    title: 'System Settings',
    path: 'system-settings',
    icon: 'settings',
    iconSet: 'outlined',
  },
];
