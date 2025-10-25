/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Store } from './mail-template-editor.store';
import { STEP } from '../types';
import { provideZonelessChangeDetection } from '@angular/core';

describe('it should test mail template editor Store', () => {
  let store: any;

  beforeEach(() => {
    store = TestBed.configureTestingModule({
      providers: [Store, provideZonelessChangeDetection()],
    }).inject(Store);
    store.addLanguage('en');
    store.addLanguage('de');
    store.addVariable('title');
    store.addVariable('greeting');
  });

  it('it should have correct initial state', () => {
    expect(store.currentStep()).toBe(STEP.LANGUAGES_SETUP);
    expect(store.languages()).toEqual(['en', 'de']);
    expect(store.variables()).toEqual({
      title: { en: '', de: '' },
      greeting: { en: '', de: '' },
    });
    expect(store.mailTemplate()).toBe('');
  });

  it('it should set the current step when setStep is called', () => {
    store.setStep(STEP.VARIABLES_SETUP);
    expect(store.currentStep()).toBe(STEP.VARIABLES_SETUP);
  });

  it('it should add new language to the languages array', () => {
    store.addLanguage('pt');
    expect(store.languages()).toEqual(['en', 'de', 'pt']);
  });

  it('it should not add existed language to the languages array', () => {
    store.addLanguage('en');
    expect(store.languages()).toEqual(['en', 'de']);
  });

  it('it should remove language at correct index', () => {
    store.removeLanguageAt(1);
    expect(store.languages()).toEqual(['en']);
  });

  it('it should not remove language at wrong index', () => {
    store.removeLanguageAt(2);
    expect(store.languages()).toEqual(['en', 'de']);
  });

  it('it should not add empty variable', () => {
    store.addVariable('');
    expect(store.variables()).toEqual({
      title: { en: '', de: '' },
      greeting: { en: '', de: '' },
    });
  });

  it('it should not add existed variable', () => {
    store.addVariable('title');
    expect(store.variables()).toEqual({
      title: { en: '', de: '' },
      greeting: { en: '', de: '' },
    });
  });

  it('it should add new variable', () => {
    store.addVariable('header');
    expect(store.variables()).toEqual({
      title: { en: '', de: '' },
      greeting: { en: '', de: '' },
      header: { en: '', de: '' },
    });
  });

  it('it should remove variable', () => {
    store.removeVariable('title');
    expect(store.variables()).toEqual({
      greeting: { en: '', de: '' },
    });
  });

  it('it should go next step', () => {
    store.goNextStep();
    expect(store.currentStep()).toBe(STEP.VARIABLES_SETUP);
  });

  it('it should not go next step', () => {
    store.goNextStep();
    store.goNextStep();
    store.goNextStep();
    expect(store.currentStep()).toBe(STEP.PREVIEW);
  });

  it('it should not go previous step', () => {
    store.goPreviousStep();
    expect(store.currentStep()).toBe(STEP.LANGUAGES_SETUP);
  });

  it('it should go previous step', () => {
    store.goNextStep();
    store.goPreviousStep();
    expect(store.currentStep()).toBe(STEP.LANGUAGES_SETUP);
  });

  it('it should update variables', () => {
    store.updateVariables({
      title: { en: '', de: '' },
      greeting: { en: 'Welcome', de: '' },
    });

    expect(store.variables()).toEqual({
      title: { en: '', de: '' },
      greeting: { en: 'Welcome', de: '' },
    });
  });

  it('it should update body', () => {
    store.updateMailTemplate('<div>Hello</div>');
    expect(store.mailTemplate()).toBe('<div>Hello</div>');
  });
});
