import { LibSafeAny } from './any';

export interface LibPageOfData<
  T extends Record<string, LibSafeAny> = Record<string, LibSafeAny>,
> {
  first?: number;
  prev?: number | null;
  next?: number | null;
  last?: number;
  pages?: number;
  items?: number;
  data: T[];
}
