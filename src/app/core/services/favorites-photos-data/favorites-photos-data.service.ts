import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { FAVORITES_PHOTOS_KEY } from './constants/favorites-photos-key';

@Injectable({
  providedIn: 'root',
})
export class FavoritesPhotosDataService {
  public favoritesPhotos$ = new BehaviorSubject<PhotoData[]>(this.getFavoritesPhotosFromStorage());

  constructor(private localStorageService: LocalStorageService) {}

  public getFavoritesPhotos(): Observable<PhotoData[]> {
    return this.favoritesPhotos$;
  }

  public getFavoritePhoto(id: string): Observable<PhotoData | null> {
    return this.favoritesPhotos$.pipe(map((favoritesPhotos: PhotoData[]) => favoritesPhotos.find((item) => item.id === id) || null));
  }

  public addToFavoritesPhotos(photoItem: PhotoData): void {
    const favoritesPhotos = this.favoritesPhotos$.getValue();
    const isPhotoAddedToFavorites = favoritesPhotos.find((item: PhotoData) => item.id === photoItem.id);

    if (!isPhotoAddedToFavorites) {
      this.favoritesPhotos$.next([...favoritesPhotos, photoItem]);
      this.saveFavoritePhotoInStorage(photoItem);
    }
  }

  public deleteFromFavoritesPhotos(id: string): void {
    const favoritesPhotos = this.favoritesPhotos$.getValue();
    const filteredFavoritesPhotos = favoritesPhotos.filter((item: PhotoData) => item.id !== id);
    this.favoritesPhotos$.next([...filteredFavoritesPhotos]);
    this.localStorageService.setDataToLocalStorage(FAVORITES_PHOTOS_KEY, JSON.stringify([...filteredFavoritesPhotos]));
  }

  private saveFavoritePhotoInStorage(photoItem: PhotoData): void {
    const savedPhotosData = this.getFavoritesPhotosFromStorage();
    this.localStorageService.setDataToLocalStorage(FAVORITES_PHOTOS_KEY, JSON.stringify([...savedPhotosData, photoItem]));
  }

  private getFavoritesPhotosFromStorage(): PhotoData[] {
    const savedPhotosData = this.localStorageService.getDataFromLocalStorage(FAVORITES_PHOTOS_KEY);
    return savedPhotosData ? JSON.parse(savedPhotosData) : [];
  }
}
