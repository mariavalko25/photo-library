import { ElementRef } from '@angular/core';
import { CustomInfiniteScrollDirective } from './custom-infinite-scroll.directive';

describe('CustomInfiniteScrollDirective', () => {
  const elementRefSub = { 
    nativeElement: '<div></div>',
  } as ElementRef;

  it('should create an instance', () => {
    const directive = new CustomInfiniteScrollDirective(elementRefSub);
    expect(directive).toBeTruthy();
  });
});
