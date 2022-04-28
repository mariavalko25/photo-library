import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PhotoData } from 'src/app/shared/models/photo-data.m';

@Injectable({
  providedIn: 'root',
})
export class FavoritesPhotosDataService {
  public favoritesPhotos$ = new BehaviorSubject<PhotoData[]>([]);

  constructor() {}

  public addToFavoritesPhotos(photoItem: PhotoData): void {
    const favoritesPhotos = this.favoritesPhotos$.getValue();
    const isPhotoIncluded = favoritesPhotos.find((item: PhotoData) => item.id === photoItem.id);

    if (!isPhotoIncluded) {
      this.favoritesPhotos$.next([...favoritesPhotos, photoItem]);
    }
  }
}
