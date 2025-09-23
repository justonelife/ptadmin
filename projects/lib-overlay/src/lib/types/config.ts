import { LibSeverity } from '@libs/lib-core';
import { Alert } from './alert';

export type AlertConfig = Pick<Alert, 'lifetime' | 'icon'> &
  Partial<Record<LibSeverity, Partial<Alert>>>;
