import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { LibIconPositionDirective } from '@libs/lib-core';

type AppLogoSize = 'small' | 'medium';

@Component({
  imports: [LibIconPositionDirective, NgClass],
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './logo.component.scss',
})
export class AppLogoComponent {
  size = input<AppLogoSize>('small');
  withName = input({
    transform: (value: unknown) => booleanAttribute(value),
  });

  withInteraction = input({
    transform: (value: unknown) => booleanAttribute(value),
  });

  logoClass = computed(() => {
    return 'app-logo--' + this.size();
  });
}
