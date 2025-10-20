import { Pipe, PipeTransform } from '@angular/core';
import { getLanguageLabel } from '../utils/get-language-label';

@Pipe({
  name: 'languageLabel',
})
export class LanguageLabelPipe implements PipeTransform {
  transform(code: string): string {
    return getLanguageLabel(code);
  }
}
