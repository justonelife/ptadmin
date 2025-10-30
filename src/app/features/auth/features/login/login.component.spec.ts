import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginContainerComponent } from './login.component';
import {
  NO_ERRORS_SCHEMA,
  provideZonelessChangeDetection,
} from '@angular/core';
import { AuthService } from '@features/auth/data-access';
import { of } from 'rxjs';
import { LibAlertService } from '@libs/lib-overlay';

describe('it should test LoginContainerComponent', () => {
  let fixture: ComponentFixture<LoginContainerComponent>;
  let component: LoginContainerComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let alertService: jasmine.SpyObj<LibAlertService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', {
      login: of({
        user: { email: 'test' },
        accessToken: 'test',
        refreshToken: 'test',
      }),
    });

    alertService = jasmine.createSpyObj('LibAlertService', [
      'success',
      'error',
    ]);

    fixture = TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(LoginContainerComponent, {
        set: {
          providers: [
            {
              provide: AuthService,
              useValue: authService,
            },
            {
              provide: LibAlertService,
              useValue: alertService,
            },
          ],
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .createComponent(LoginContainerComponent);

    await fixture.whenStable();

    component = fixture.componentInstance;
  });

  it('it should NOT call api when form invalid', () => {
    component.form.patchValue({
      email: '',
      password: '123456',
    });
    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('it should NOT call api when `logging`=true', () => {
    component.form.patchValue({
      email: 'test@email.com',
      password: '123456',
    });
    component.logging = true;
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('it should call api when form valid', () => {
    component.form.patchValue({
      email: 'test@email.com',
      password: '123456',
    });
    component.login();

    expect(authService.login).toHaveBeenCalledOnceWith({
      email: 'test@email.com',
      password: '123456',
    });
  });

  it('it should have correct initial state', () => {
    const formValue = component.form.getRawValue();
    expect(formValue).toEqual({
      email: '',
      password: '',
    });
  });
});
