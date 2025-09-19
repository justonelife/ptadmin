import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injectable,
  InjectionToken,
  input,
} from '@angular/core';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

type ButtonVariant = 'normal' | 'icon' | 'raised' | 'outlined';
const VARIANT_RESOLVER = new InjectionToken<IVariantResolve>(
  'VARIANT_RESOLVER'
);

interface IVariantResolve {
  variant: ButtonVariant;
  getClass(): string;
}

@Injectable()
class NormalVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'normal';
  getClass(): string {
    return 'text-white';
  }
}

@Injectable()
class IconVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'icon';
  getClass(): string {
    return 'bg-transparent text-black dark:text-white aspect-square px-1!';
  }
}

@Injectable()
class RaisedVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'raised';
  getClass(): string {
    return 'shadow-lg text-white';
  }
}

//FIXME: variant outlined + severity primary bugging
@Injectable()
class OutlinedVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'outlined';
  getClass(): string {
    return 'bg-transparent border hover:text-white text-black dark:text-white';
  }
}

@Component({
  //FIXME: set lint-staged in package.json to max-warnings=0
  /* eslint-disable @angular-eslint/component-selector */
  selector: 'a[lib-button], button[lib-button]',
  template: `
    @if (variant() !== 'icon') {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: LibSeverityDirective,
    },
    {
      inputs: ['libIconPosition', 'icon', 'iconSet'],
      directive: LibIconPositionDirective,
    },
  ],
  styleUrl: './button.component.scss',
  host: {
    '[attr.buttonClass]': 'klass()',
  },
  providers: [
    { provide: VARIANT_RESOLVER, useClass: NormalVariantResolver, multi: true },
    { provide: VARIANT_RESOLVER, useClass: IconVariantResolver, multi: true },
    { provide: VARIANT_RESOLVER, useClass: RaisedVariantResolver, multi: true },
    {
      provide: VARIANT_RESOLVER,
      useClass: OutlinedVariantResolver,
      multi: true,
    },
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severityClass', 'buttonClass', 'class'],
    },
  ],
})
export class LibButtonComponent {
  variantResolvers = inject<IVariantResolve[]>(VARIANT_RESOLVER);

  variant = input<ButtonVariant>('normal');

  readonly DEFAULT_CLASS =
    'cursor-pointer inline-flex items-center justify-center p-1 px-4 font-semibold h-[32px] text-md rounded-md';

  klass = computed(() => {
    const variant = this.variant();
    try {
      const klassByVariant = this.variantResolvers
        .filter((v) => v.variant === variant)[0]
        .getClass();
      return `${this.DEFAULT_CLASS} ${klassByVariant}`;
    } catch {
      return this.DEFAULT_CLASS;
    }
  });
}
