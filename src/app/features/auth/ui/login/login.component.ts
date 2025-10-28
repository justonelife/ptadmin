import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from '@features/auth/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import {
  DYNAMIC_TYPE,
  DynamicType,
  LibDynamicFormComponent,
  RecordDynamicField,
} from '@libs/lib-controller';
import { LibTypedForm } from '@libs/lib-core';

@Component({
  imports: [
    LibCardComponent,
    LibDynamicFormComponent,
    ReactiveFormsModule,
    LibButtonComponent,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full h-full block dark:bg-slate-950',
  },
})
export class LoginComponent<T extends Login = Login> {
  login = output<T>();

  readonly FIELDS: RecordDynamicField<DynamicType, Login> = {
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
      autoFocus: true,
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
  form = input.required<LibTypedForm<T>>();

  onSubmit(): void {
    this.login.emit(this.form().value as T);
  }
}
