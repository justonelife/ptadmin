import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@features/mail-template-editor/data-access';
import { LivePreviewComponent } from './live-preview.component';
import { IAlertService, LibAlertService } from '@libs/lib-overlay';

describe('it should test LivePreviewComponent', () => {
  const store = {
    languages: signal(['en', 'de']),
    variables: signal({
      greeting: {
        en: 'Welcome',
        de: 'Willkommen',
      },
    }),
    mailTemplate: signal<string>('<div>{{greeting}}</div>'),
  };

  const alertService: IAlertService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };

  let fixture: ComponentFixture<LivePreviewComponent>;
  let component: LivePreviewComponent;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: Store, useValue: store },
        { provide: LibAlertService, useValue: alertService },
      ],
    }).createComponent(LivePreviewComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('it should init body correctly', () => {
    expect(component.mailTemplate).toBe('<div>{{greeting}}</div>');
  });

  it('it should generate preview for all languages', () => {
    component.generatePreviewAllLanguages();
    expect(component.preview()).toEqual({
      en: '<div>Welcome</div>',
      de: '<div>Willkommen</div>',
    });
  });

  xit('it should alert info when button copy clicked', () => {
    component.previewCopied();

    expect(component.alertService.info).toHaveBeenCalledWith({
      icon: 'info',
      title: 'Info',
      message: 'Copied!',
      lifetime: 2_000,
    });
  });
});
