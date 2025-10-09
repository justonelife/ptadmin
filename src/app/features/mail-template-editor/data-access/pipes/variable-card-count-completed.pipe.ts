import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variableCardCountCompleted',
})
export class VariableCardCountCompletedPipe implements PipeTransform {
  transform(obj: Record<string, string>, languages: string[]): number {
    let count = languages.length;
    languages.forEach((language) => {
      if (!obj[language]) {
        count--;
      }
    });
    return count;
  }
}
