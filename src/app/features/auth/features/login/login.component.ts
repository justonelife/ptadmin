import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, Login } from '@features/auth/data-access';
import { LoginComponent } from '@features/auth/ui/login/login.component';
import { LibTypedForm } from '@libs/lib-core';
import { LibAlertService } from '@libs/lib-overlay';
import { finalize } from 'rxjs';

@Component({
  imports: [LoginComponent, CommonModule],
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  readonly alertService = inject(LibAlertService);
  readonly authService = inject(AuthService);

  form: LibTypedForm<Login> = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  logging = false;

  login(): void {
    if (this.logging) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.logging = true;
    this.authService
      .login(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.logging = false;
        })
      )
      .subscribe();
  }
}
