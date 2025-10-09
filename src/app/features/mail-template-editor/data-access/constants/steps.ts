import { STEP, Step } from '../types';

export const STEPS: Step[] = [
  {
    id: STEP.LANGUAGES_SETUP,
    title: 'Setup',
    subTitle: 'Configure languages',
    icon: 'settings',
  },
  {
    id: STEP.VARIABLES_SETUP,
    title: 'Variables',
    subTitle: 'Manage content',
    icon: 'add_notes',
  },
  {
    id: STEP.PREVIEW,
    title: 'Preview',
    subTitle: 'Test template',
    icon: 'visibility',
  },
];
