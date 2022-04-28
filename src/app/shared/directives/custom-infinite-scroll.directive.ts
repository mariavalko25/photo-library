import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, filter, fromEvent, map, pairwise, Subject, takeUntil } from 'rxjs';

interface ScrollPosition {
  scrollHeight: number;
  scrollTop: number;
  clientHeight: number;
}

@Directive({
  selector: '[appCustomInfiniteScroll]',
})
export class CustomInfiniteScrollDirective implements AfterViewInit, OnDestroy {
  @Input() public scrollPercent = 70;
  @Output() public scrolled = new EventEmitter<void>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private elementRef: ElementRef<HTMLDivElement>) {}

  public ngAfterViewInit(): void {
    this.listenScrollEvent();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private listenScrollEvent(): void {
    fromEvent(this.elementRef.nativeElement, 'scroll')
      .pipe(
        takeUntil(this.destroy$),
        /* eslint-disable @typescript-eslint/no-explicit-any */
        map((event: any): ScrollPosition => {
          return {
            scrollHeight: event.target?.scrollHeight,
            scrollTop: event.target?.scrollTop,
            clientHeight: event.target?.clientHeight,
          };
        }),
        pairwise(),
        debounceTime(200),
        filter((positions) => {
          const prevPosition = positions[0];
          const curPosition = positions[1];
          const isUserScrollDown = curPosition.scrollTop > prevPosition.scrollTop;
          const isScrollExpectedPercent =
            (curPosition.scrollTop + curPosition.clientHeight) / curPosition.scrollHeight > this.scrollPercent / 100;
          return isUserScrollDown && isScrollExpectedPercent;
        }),
      )
      .subscribe(() => this.scrolled.emit());
  }
}
