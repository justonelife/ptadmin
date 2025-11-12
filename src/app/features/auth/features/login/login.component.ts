import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Login } from '@features/auth/data-access';
import { LoginComponent } from '@features/auth/ui/login/login.component';
import { LibTypedForm } from '@libs/lib-core';
import { LibAlertService } from '@libs/lib-overlay';
import { finalize, tap } from 'rxjs';

@Component({
  imports: [LoginComponent, CommonModule],
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  readonly alertService = inject(LibAlertService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  form: LibTypedForm<Login> = new FormGroup({
    email: new FormControl<string>('admin@example.com', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl<string>('SuperSecurePassword123', {
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
        tap((response) => {
          if (!response.errors) {
            this.router.navigateByUrl('users');
          }
        }),
        finalize(() => {
          this.logging = false;
        })
      )
      .subscribe();
  }
}
