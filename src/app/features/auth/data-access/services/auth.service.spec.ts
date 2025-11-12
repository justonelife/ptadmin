import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { LOGIN } from '../graphql/auth.mutations';
import { AuthPayload, Login } from '../types/auth';
import { AuthService } from './auth.service';
import { ME } from '../graphql/auth.queries';

describe('it should test AuthService', () => {
  let service: AuthService;
  let controller: ApolloTestingController;
  const localStorageMock = (function () {
    return {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem'),
    };
  })();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [AuthService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(AuthService);

    controller = TestBed.inject(ApolloTestingController);
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    controller.verify();
  });

  it('it should create AuthService', () => {
    expect(service).toBeTruthy();
  });

  it('it should login and return an auth payload', () => {
    const mockLogin: Login = { email: 'test@email.com', password: '123456' };
    const mockResponsePayload: AuthPayload = {
      user: {
        email: 'test@email.com',
      },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    service.login(mockLogin).subscribe((response) => {
      expect(response.data?.login).toEqual(mockResponsePayload);
    });

    const op = controller.expectOne(LOGIN);

    expect(op.operation.variables['email']).toBe('test@email.com');
    expect(op.operation.variables['password']).toBe('123456');

    op.flush({
      data: {
        login: {
          ...mockResponsePayload,
        },
      },
    });
  });

  it('it should save `access_token` into `localStorage`', () => {
    service.saveAccessToken('value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'access_token',
      'value'
    );
  });

  it('it should save `refresh_token` into `localStorage`', () => {
    service.saveRefreshToken('value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'refresh_token',
      'value'
    );
  });

  it('it should request and return if `isAuthenticated`', () => {
    service.isAuthenticated().subscribe((response) => {
      expect(response).toBe(true);
    });

    const op = controller.expectOne(ME);

    op.flush({
      data: {
        me: { email: 'admin@example.com' },
      },
    });
  });
});
