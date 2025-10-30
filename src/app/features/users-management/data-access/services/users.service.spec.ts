import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { LIST_USERS } from '../graphql/users.queries';
import { User } from '../types';

describe('it should test UsersService', () => {
  let service: UsersService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [provideZonelessChangeDetection(), UsersService],
    });
    service = TestBed.inject(UsersService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('it should create UsersService', () => {
    expect(service).toBeTruthy();
  });

  xit('it should request and return ListUsers', () => {
    const mockResponsePayload: User[] = [
      {
        id: '1',
        email: 'john.doe@example.com',
        createdAt: new Date(),
      },
      {
        id: '2',
        email: 'alice@example.com',
        createdAt: new Date(),
      },
      {
        id: '3',
        email: 'bob@example.com',
        createdAt: new Date(),
      },
    ];

    service.getUsers().subscribe((response) => {
      expect(response).toEqual(mockResponsePayload);
    });

    const op = controller.expectOne(LIST_USERS);
    expect(op.operation.operationName).toBe('ListUsers');

    op.flush({
      data: { listUsers: [...mockResponsePayload] },
    });
  });
});
