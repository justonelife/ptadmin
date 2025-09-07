import { LibTabItem } from '@libs/lib-tabs';

export const TABS: LibTabItem[] = [
  {
    value: 'general',
    label: 'General',
    component: import(
      '@features/system-settings/features/general-settings/general-settings.component'
    ).then((c) => c.GeneralSettingsComponent),
  },
  {
    value: 'api',
    label: 'Api',
    component: import(
      '@features/system-settings/features/general-settings/general-settings.component'
    ).then((c) => c.GeneralSettingsComponent),
  },
  { value: 'email', label: 'Email' },
  { value: 'pt-service', label: 'Pt Service' },
  { value: 'user-interface', label: 'User Interface' },
  { value: 'tool-integration', label: 'Tool Integration' },
  { value: 'templates', label: 'Templates' },
  { value: 'all', label: 'All' },
  { value: 'backend-request', label: 'Backend Request' },
  { value: 'test', label: 'Test' },
];
