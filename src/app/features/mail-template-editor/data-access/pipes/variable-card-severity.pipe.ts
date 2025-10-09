import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variableCardSeverity',
})
export class VariableCardSeverityPipe implements PipeTransform {
  transform(
    obj: Record<string, string>,
    languages: string[]
  ): 'warning' | 'success' {
    let result: 'warning' | 'success' = 'success';
    languages.forEach((language) => {
      if (!obj[language]) {
        result = 'warning';
      }
    });
    return result;
  }
}
