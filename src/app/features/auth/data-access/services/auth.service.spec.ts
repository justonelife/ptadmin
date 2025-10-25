import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { LOGIN } from '../graphql/auth.mutations';
import { AuthPayload, Login } from '../types/auth';
import { AuthService } from './auth.service';

describe('it should test AuthService', () => {
  let service: AuthService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [AuthService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(AuthService);

    controller = TestBed.inject(ApolloTestingController);
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
});
