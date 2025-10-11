import { KeyValuePipe } from '@angular/common';
import {
  NO_ERRORS_SCHEMA,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SearchVariablePipe,
  Store,
  VariableCardCountCompletedPipe,
  VariableCardLanguageInputs,
  VariableCardSeverityPipe,
} from '@features/mail-template-editor/data-access';
import { VariablesManagerComponent } from './variables-manager.component';

describe('it should test VariablesManagerComponent', () => {
  const store = {
    languages: signal<string[]>(['en', 'de']),
    variables: signal({
      title: {
        en: 'Welcome',
        de: 'Willkommen',
      },
      header_title: {
        en: 'Get ready',
        de: 'Mach dich bereit',
      },
    }),
    updateVariables: jasmine.createSpy('updateVariables'),
    addVariable: jasmine.createSpy('addVariable'),
  };

  let fixture: ComponentFixture<VariablesManagerComponent>;
  let component: VariablesManagerComponent;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(VariablesManagerComponent, {
        set: {
          providers: [{ provide: Store, useValue: store }],
          imports: [
            KeyValuePipe,
            SearchVariablePipe,
            VariableCardCountCompletedPipe,
            VariableCardLanguageInputs,
            VariableCardSeverityPipe,
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .createComponent(VariablesManagerComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('it should create form', () => {
    expect(component.parentForm.value).toEqual({
      title: {
        en: 'Welcome',
        de: 'Willkommen',
      },
      header_title: {
        en: 'Get ready',
        de: 'Mach dich bereit',
      },
    });
  });

  it('it should call store update variables', () => {
    component.parentForm.setValue({
      title: {
        en: 'CHANGED!!!',
        de: 'Willkommen',
      },
      header_title: {
        en: 'Get ready',
        de: 'ALSO CHANGED!!!',
      },
    });

    expect(store.updateVariables).toHaveBeenCalledWith({
      title: {
        en: 'CHANGED!!!',
        de: 'Willkommen',
      },
      header_title: {
        en: 'Get ready',
        de: 'ALSO CHANGED!!!',
      },
    });
  });

  it('it should call store add variable', () => {
    component.variableControl.setValue('new_variable');
    component.onAddVariable();
    expect(store.addVariable).toHaveBeenCalledWith('new_variable');
  });

  it('it should reset variable control after added variable', () => {
    component.variableControl.setValue('new_variable');
    component.onAddVariable();
    expect(component.variableControl.value).toBe('');
  });
});
