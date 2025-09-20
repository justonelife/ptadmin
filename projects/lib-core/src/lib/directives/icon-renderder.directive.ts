import {
  Directive,
  effect,
  ElementRef,
  inject,
  Injectable,
  InjectionToken,
  input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LibSafeAny } from '../types';

export type IconVerticalPostion = 'top' | 'center' | 'bottom';
export type IconHorizontalPosition = 'left' | 'center' | 'right';
export type IconCombinePosition =
  `${IconVerticalPostion} ${IconHorizontalPosition}`;

const ICON_RENDERER = new InjectionToken<IconRenderer>('ICON_RENDERER');

interface IconRenderer {
  readonly position: IconCombinePosition;
  render(icon: string, iconSet: string): void;
}

@Directive()
abstract class AbstractIconRenderer implements IconRenderer {
  abstract readonly position: IconCombinePosition;
  protected iconContainer?: HTMLElement;
  protected renderer = inject(Renderer2);
  protected el = inject(ElementRef<HTMLElement>);
  protected vcr = inject(ViewContainerRef);
  protected helper = inject(LibRendererService);

  render(icon: string, iconSet: string) {
    this.clear();
    this.iconContainer = this.renderer.createElement('div');
    this.setup(this.iconContainer!);
    this.helper.appendIcon(
      icon,
      iconSet,
      this.vcr,
      this.iconContainer,
      this.el,
      this.renderer
    );
  }

  protected clear() {
    if (this.iconContainer) {
      this.renderer.removeChild(this.el.nativeElement, this.iconContainer);
    }
  }

  /** Subclasses override just to add the CSS classes they need */
  protected abstract setup(container: HTMLElement): void;
}

@Injectable({
  providedIn: 'root',
})
export class LibRendererService {
  addClasses(renderer: Renderer2, native: LibSafeAny, ...classes: string[]) {
    classes.forEach((c) => renderer.addClass(native, c));
  }

  clearIcon(renderer: Renderer2, el: ElementRef, container: LibSafeAny) {
    if (container) {
      renderer.removeChild(el.nativeElement, container);
    }
  }

  appendIcon(
    icon: string,
    iconSet: string,
    vcr: ViewContainerRef,
    iconContainerNode: LibSafeAny,
    parent: ElementRef,
    renderer: Renderer2
  ) {
    const _icon = vcr.createComponent(MatIcon);
    _icon.setInput('fontIcon', icon);
    if (iconSet) {
      _icon.setInput('fontSet', iconSet);
    }
    renderer.appendChild(iconContainerNode, _icon.location.nativeElement);

    renderer.appendChild(parent.nativeElement, iconContainerNode);
  }
}

@Injectable()
export class CenterCenterIconRenderder extends AbstractIconRenderer {
  readonly position = 'center center';

  protected override setup(container: HTMLElement): void {
    this.helper.addClasses(this.renderer, this.el.nativeElement, 'relative');
    this.helper.addClasses(
      this.renderer,
      container,
      'absolute',
      'inset-0',
      'flex',
      'items-center',
      'justify-center'
    );
  }
}

@Injectable()
export class CenterLeftIconRenderer extends AbstractIconRenderer {
  readonly position = 'center left';

  protected override setup(container: HTMLElement): void {
    this.helper.addClasses(
      this.renderer,
      this.el.nativeElement,
      'flex',
      'items-center',
      'gap-2'
    );
    this.helper.addClasses(
      this.renderer,
      container,
      'order-first',
      'h-full',
      'flex',
      'items-center'
    );
  }
}

@Injectable()
export class CenterRightIconRenderer extends AbstractIconRenderer {
  readonly position = 'center right';

  protected override setup(container: HTMLElement): void {
    this.helper.addClasses(
      this.renderer,
      this.el.nativeElement,
      'flex',
      'items-center',
      'gap-2'
    );
    this.helper.addClasses(
      this.renderer,
      container,
      'order-last',
      'h-full',
      'flex',
      'items-center'
    );
  }
}

@Injectable()
export class TopLeftIconRenderer extends AbstractIconRenderer {
  readonly position = 'top left';

  protected override setup(container: HTMLElement): void {
    this.helper.addClasses(
      this.renderer,
      this.el.nativeElement,
      'flex',
      'gap-2'
    );
    this.helper.addClasses(
      this.renderer,
      container,
      'order-first',
      'h-full',
      'flex',
      'items-start'
    );
  }
}

@Directive({
  selector: '[libIconPosition]',
  standalone: true,
  providers: [
    {
      provide: ICON_RENDERER,
      useClass: CenterCenterIconRenderder,
      multi: true,
    },
    { provide: ICON_RENDERER, useClass: CenterLeftIconRenderer, multi: true },
    { provide: ICON_RENDERER, useClass: CenterRightIconRenderer, multi: true },
    { provide: ICON_RENDERER, useClass: TopLeftIconRenderer, multi: true },
  ],
})
export class LibIconPositionDirective {
  renderers = inject<IconRenderer[]>(ICON_RENDERER);

  position = input<IconCombinePosition>('center left', {
    alias: 'libIconPosition',
  });
  icon = input<string>('');
  iconSet = input<string>('');

  constructor() {
    effect(() => {
      const icon = this.icon();
      if (!icon) return;
      const strategy = this.renderers.find(
        (renderer) => renderer.position === this.position()
      );
      if (strategy) strategy.render(icon, this.iconSet());
      else console.warn(`Invalid Icon Position ${this.position()}`);
    });
  }
}
