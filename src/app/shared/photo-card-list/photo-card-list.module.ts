import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardListComponent } from './photo-card-list.component';
import { PhotoCardModule } from '../photo-card/photo-card.module';

@NgModule({
  declarations: [PhotoCardListComponent],
  imports: [CommonModule, PhotoCardModule],
  exports: [PhotoCardListComponent],
})
export class PhotoCardListModule {}
