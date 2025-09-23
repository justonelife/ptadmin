import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  linkedSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { LibButtonComponent } from '@libs/lib-button';
import {
  LIB_CLASS_MERGER_SOURCES,
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  interval,
  race,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';

export interface IAlertComponent {
  title: string | Signal<string>;
  message: string | Signal<string>;
  emitClose: OutputEmitterRef<void>;

  close(): void;
}

@Component({
  selector: 'lib-alert',
  imports: [LibButtonComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: LibSeverityDirective,
      inputs: ['libSeverity:severity'],
    },
    {
      directive: LibAppearanceDirective,
      inputs: ['libAppearance:appearance'],
    },
    LibClassMergerDirective,
    {
      directive: LibIconPositionDirective,
      inputs: ['libIconPosition', 'icon', 'iconSet'],
    },
  ],
  providers: [
    {
      provide: LIB_CLASS_MERGER_SOURCES,
      useValue: ['severity-class', 'appearance-class', 'class'],
    },
  ],
  host: {
    class: 'relative block p-2 w-[400px] overflow-hidden',
  },
})
export class LibAlertComponent implements IAlertComponent, OnInit {
  title = input<string>('');
  message = input<string>('');
  lifetime = input<number | undefined>(undefined);
  closable = input<boolean>();

  emitClose = output();
  manualClose$ = new Subject<void>();
  paused$ = new BehaviorSubject<boolean>(false);
  timeLeft = linkedSignal(() => this.lifetime() || 0);
  lifeTimePercent = computed(() => {
    if (this.timeLeft() < 0) return 0;
    if (!this.lifetime()) return 0;
    return (this.timeLeft() / (this.lifetime() || 1)) * 100;
  });

  @HostListener('mouseenter')
  onMouseEnter() {
    this.paused$.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.paused$.next(false);
  }

  ngOnInit(): void {
    race([
      this.manualClose$,
      this.paused$.pipe(
        switchMap((paused) => {
          const TICK = 100; //ms
          return !paused
            ? interval(TICK).pipe(
                tap(() => {
                  this.timeLeft.update((v) => v - TICK);
                }),
                filter(() => this.timeLeft() < 0)
              )
            : EMPTY;
        })
      ),
    ])
      .pipe(
        take(1),
        tap(() => this.emitClose.emit())
      )
      .subscribe();
  }

  close(): void {
    this.manualClose$.next();
    this.manualClose$.complete();
  }
}
