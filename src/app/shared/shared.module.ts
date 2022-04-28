import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { PhotoCardModule } from './photo-card/photo-card.module';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonModule, PhotoCardModule],
})
export class SharedModule {}
