import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPhotosComponent } from './favorites-photos/favorites-photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoListComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPhotosComponent,
  },
  {
    path: 'photos/:id',
    component: PhotoDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
