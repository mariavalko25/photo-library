import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonModule],
})
export class SharedModule {}
