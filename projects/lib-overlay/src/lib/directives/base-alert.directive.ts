import { Directive } from '@angular/core';
import { IAlertComponent } from '../components/alert/alert.component';

@Directive({
  selector: '[libBaseAlert]',
})
export abstract class LibBaseAlert implements IAlertComponent {}
