import { Pipe, PipeTransform } from '@angular/core';
import { AppTheme } from '../types';

@Pipe({
  name: 'isLightTheme',
  standalone: true,
})
export class IsLightThemePipe implements PipeTransform {
  transform(value: AppTheme): boolean {
    return value === 'light';
  }
}
