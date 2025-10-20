import { LANGUAGES } from '../constants';

export function getLanguageLabel(code: string): string {
  return LANGUAGES.find((item) => item.value === code)?.label || '';
}
