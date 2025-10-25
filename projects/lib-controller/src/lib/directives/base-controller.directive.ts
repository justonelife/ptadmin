import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { OnChangeType, OnTouchedType } from '@libs/lib-core';
import { distinctUntilChanged, startWith, take, tap } from 'rxjs';
import { DYNAMIC_CONTROL } from '../pipes/dynamic-control.pipe';

@Directive({
  host: {
    class: 'lib-controller',
    '[class.lib-controller--error]': 'hasError()',
  },
})
export abstract class LibBaseController<T>
  implements ControlValueAccessor, OnInit
{
  dynamicControl = inject(DYNAMIC_CONTROL, { optional: true });
  destroyRef = inject(DestroyRef);

  cdr = inject(ChangeDetectorRef);
  onChange: OnChangeType = (v: T) => {
    this.dynamicControl?.setValue(v);
  };
  onTouched: OnTouchedType = () => null;
  disabled = signal(false);
  state: T | undefined;

  abstract placeholder: string | Signal<string>;
  abstract label: string | Signal<string>;

  hasError = signal<boolean>(false);

  ngOnInit() {
    this.listenValueChanges();
    this.listenStatusChanges();
    this.listenAndMarkControlDirty();
  }

  protected listenValueChanges(): void {
    this.dynamicControl?.valueChanges
      .pipe(
        startWith(this.dynamicControl.value),
        tap((value) => {
          this.writeValue(value);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected listenStatusChanges(): void {
    this.dynamicControl?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.hasError.set(!!this.dynamicControl?.errors);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected listenAndMarkControlDirty(): void {
    this.dynamicControl?.valueChanges
      .pipe(
        take(1),
        tap(() => {
          this.dynamicControl?.markAsDirty();
          this.onTouched();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  writeValue(value: T): void {
    this.state = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
