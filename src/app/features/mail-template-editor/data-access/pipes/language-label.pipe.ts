import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../constants';

@Pipe({
  name: 'languageLabel',
})
export class LanguageLabelPipe implements PipeTransform {
  transform(code: string): string {
    return LANGUAGES.find((item) => item.value === code)?.label || '';
  }
}
