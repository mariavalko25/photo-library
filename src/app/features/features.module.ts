import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { FavoritesPhotosComponent } from './favorites-photos/favorites-photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PhotoListComponent, FavoritesPhotosComponent, PhotoDetailsComponent],
  imports: [CommonModule, FeaturesRoutingModule, SharedModule, RouterModule],
})
export class FeaturesModule {}
