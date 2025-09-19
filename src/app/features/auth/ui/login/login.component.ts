import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from '@features/auth/data-access';
import { LibCardComponent } from '@libs/lib-card';
import {
  DYNAMIC_TYPE,
  LibDynamicFormComponent,
  RecordDynamicField,
} from '@libs/lib-controller';
import { AppTypedForm } from '@libs/lib-core';

@Component({
  imports: [LibCardComponent, LibDynamicFormComponent, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex items-center justify-center w-dvw h-dvh',
  },
})
export class LoginComponent<T extends Login = Login> {
  //TODO: RecordDynamicField should accept Login interface and compute possible FieldKey
  readonly FIELDS: RecordDynamicField = {
    email: {
      label: 'Email',
      type: DYNAMIC_TYPE.INPUT,
      withWrapper: true,
      icon: 'person',
      iconSet: 'outlined',
      styleClass: 'col-span-12',
      inputs: {
        placeholder: 'Enter your email',
      },
    },
    password: {
      label: 'Password',
      type: DYNAMIC_TYPE.PASSWORD_INPUT,
      withWrapper: true,
      icon: 'lock',
      iconSet: 'outlined',
      styleClass: 'col-span-12',
      inputs: {
        placeholder: 'Enter your password',
      },
    },
  };
  form = input.required<AppTypedForm<T>>();
}
