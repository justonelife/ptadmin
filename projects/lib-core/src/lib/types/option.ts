import { LibSafeAny } from './any';

export interface LibOption<TValue = LibSafeAny, TLabel = string> {
  label: TLabel;
  value: TValue;
}
