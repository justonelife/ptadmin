import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EnvironmentProviders,
  inject,
  InjectionToken,
  input,
  makeEnvironmentProviders,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { LibIconPositionDirective, LibSafeAny } from '@libs/lib-core';
import { tap } from 'rxjs';

export type ErrorMessageFn = (err: LibSafeAny) => string;
export type LibRecordErrorMessages = Record<string, string | ErrorMessageFn>;

export const RECORD_ERROR_MESSAGES = new InjectionToken<LibRecordErrorMessages>(
  'RECORD_ERROR_MESSAGES',
  {
    providedIn: 'root',
    factory() {
      return {
        required: 'This field is required!',
      } as LibRecordErrorMessages;
    },
  }
);

export function provideRecordErrorMessages(
  messages: LibRecordErrorMessages
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: RECORD_ERROR_MESSAGES,
      useValue: messages,
    },
  ]);
}

@Component({
  imports: [LibIconPositionDirective],
  selector: 'lib-error-message',
  templateUrl: './error-message.component.html',
  host: {
    '[class.hidden!]': 'isValid()',
    class: 'flex items-center gap-1 text-sm text-red-500 font-bold',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibErrorMessageComponent implements OnInit {
  readonly destroyRef = inject(DestroyRef);

  controlErrorMessages = inject(RECORD_ERROR_MESSAGES);
  control = input.required<AbstractControl | null>();
  customMessage = input<string>('');
  message = signal<string>('');

  isValid(): boolean {
    const control = this.control();

    if (!control) return true;

    return control.valid || control.pristine;
  }

  ngOnInit(): void {
    this.control()
      ?.statusChanges.pipe(
        tap(() => {
          this.message.update(() => {
            for (const error in this.control()?.errors) {
              return Object.prototype.hasOwnProperty.call(
                this.controlErrorMessages,
                error
              )
                ? typeof this.controlErrorMessages[error] === 'function'
                  ? this.controlErrorMessages[error](this.control()?.errors)
                  : this.controlErrorMessages[error]
                : 'Unknown error';
            }
            return '';
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
