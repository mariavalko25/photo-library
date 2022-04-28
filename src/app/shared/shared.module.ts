import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { PhotoCardModule } from './photo-card/photo-card.module';
import { CustomInfiniteScrollDirective } from './directives/custom-infinite-scroll.directive';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [CustomInfiniteScrollDirective],
  imports: [CommonModule],
  exports: [ButtonModule, PhotoCardModule, CustomInfiniteScrollDirective, LoadingModule],
})
export class SharedModule {}
