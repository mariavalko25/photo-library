import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from './photo-card.component';

@NgModule({
  declarations: [PhotoCardComponent],
  imports: [CommonModule],
  exports: [PhotoCardComponent],
})
export class PhotoCardModule {}
