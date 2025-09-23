import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '@features/auth/data-access';
import { LoginComponent } from '@features/auth/ui/login/login.component';
import { LibTypedForm } from '@libs/lib-core';
import { LibAlertService } from '@libs/lib-overlay';

@Component({
  imports: [LoginComponent],
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  readonly alertService = inject(LibAlertService);

  form: LibTypedForm<Login> = new FormGroup({
    email: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  alert(): void {
    const random = Math.round(Math.random());
    if (random === 0) {
      this.alertService.success();
    } else {
      this.alertService.error();
    }
  }
}
