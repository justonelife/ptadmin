import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
} from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  LibOption,
  LibSafeAny,
  OnChangeType,
  OnTouchedType,
  provideControlValueAccessor,
} from '@libs/lib-core';

@Component({
  standalone: true,
  imports: [MatButtonToggleModule, FormsModule],
  selector: 'lib-button-toggle',
  templateUrl: './button-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-[40px] p-1 w-fit rounded-md bg-secondary',
  },
  styleUrl: './button-toggle.component.scss',
  providers: [provideControlValueAccessor(LibButtonToggleComponent)],
})
export class LibButtonToggleComponent<TOption extends LibOption = LibOption>
  implements ControlValueAccessor
{
  readonly cdr = inject(ChangeDetectorRef);

  options = input.required<TOption[]>();

  state: LibSafeAny;
  onChange: OnChangeType = () => null;
  onTouched: OnTouchedType = () => null;
  disabled = false;

  writeValue(value: LibSafeAny): void {
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
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  selectChange() {
    this.onChange(this.state);
  }
}
