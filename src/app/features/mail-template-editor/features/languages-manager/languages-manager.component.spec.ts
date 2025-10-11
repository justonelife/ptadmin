import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@features/mail-template-editor/data-access';
import { LanguagesManagerComponent } from './languages-manager.component';

describe('it should test LanguagesManagerComponent', () => {
  const store = {
    languages: signal<string[]>([]),
    addLanguage: jasmine.createSpy('addLanguage'),
  };
  let fixture: ComponentFixture<LanguagesManagerComponent>;
  let component: LanguagesManagerComponent;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: store },
        provideZonelessChangeDetection(),
      ],
    }).createComponent(LanguagesManagerComponent);
    await fixture.whenStable();

    component = fixture.componentInstance;
  });

  it('it should call store add language with right value', async () => {
    component.addLanguage('en');
    expect(store.addLanguage).toHaveBeenCalledWith('en');
  });

  it('it should reset selected language', async () => {
    component.addLanguage('en');
    expect(component.selectedLanguage).toBe('');
  });
});
