import {
  Overlay,
  OverlayModule,
  OverlayPositionBuilder,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '@libs/lib-core';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-popover',
  template: `
    <ng-template #popover>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayModule],
})
export class LibPopoverComponent {
  overlay = inject(Overlay);
  positionBuilder = inject(OverlayPositionBuilder);
  scrollStrategies = inject(ScrollStrategyOptions);
  vcr = inject(ViewContainerRef);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);

  popoverTemplate = viewChild.required<TemplateRef<unknown>>('popover');
  appendTo = input<'body' | null>(null);
  panelClass = input<string>('');

  target: HTMLElement | null = null;

  isOpen = signal(false);

  private overlayRef: OverlayRef | null = null;

  private buildOverlayRef(target: HTMLElement): OverlayRef {
    const ref = this.overlay.create({
      positionStrategy: this.positionBuilder
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
      scrollStrategy: this.scrollStrategies.reposition(),
      panelClass: this.computePanelClass(),
    });

    const templatePortal = new TemplatePortal(this.popoverTemplate(), this.vcr);
    ref.attach(templatePortal);

    return ref;
  }

  show(event: Event, targetEl?: HTMLElement) {
    if (this.overlayRef) return;
    this.target = targetEl || (event.target as HTMLElement);

    this.overlayRef = this.buildOverlayRef(this.target);
    this.listenOutsideClick(this.overlayRef);
  }

  private listenOutsideClick(overlayRef: OverlayRef) {
    const outsidePointerEventsSubscription = overlayRef
      .outsidePointerEvents()
      .pipe(
        tap((event) => {
          if (
            this.overlayRef &&
            !this.target?.contains(event.target as Node) &&
            !this.elementRef.nativeElement.contains(event.target)
          ) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.target = null;
            outsidePointerEventsSubscription.unsubscribe();
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private computePanelClass(): string[] {
    const defaultStyleClass = ['shadow-md', 'bg-secondary', 'rounded-md'];
    return cn(...defaultStyleClass, this.panelClass()).split(' ');
  }
}
