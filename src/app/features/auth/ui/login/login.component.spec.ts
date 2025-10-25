import {
  NO_ERRORS_SCHEMA,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '@features/auth/data-access';
import { LibTypedForm } from '@libs/lib-core';
import { LoginComponent } from './login.component';

describe('it should test LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let loginSpy: jasmine.Spy;
  const form: LibTypedForm<Login> = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(LoginComponent, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .createComponent(LoginComponent);
    fixture.componentRef.setInput('form', form);

    await fixture.whenStable();
    component = fixture.componentInstance;

    loginSpy = spyOn(component.login, 'emit');
  });

  it('it should emit `login` when `onSubmit` is clicked', () => {
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledTimes(1);
  });
});
