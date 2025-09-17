import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '@features/auth/data-access';
import { LoginComponent } from '@features/auth/ui/login/login.component';
import { AppTypedForm } from '@libs/lib-core';

@Component({
  imports: [LoginComponent],
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  form: AppTypedForm<Login> = new FormGroup({
    email: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
}
