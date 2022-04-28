import { firstValueFrom } from 'rxjs';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { FavoritesPhotosDataService } from './favorites-photos-data.service';

describe('FavoritesPhotosDataService', () => {
  let service: FavoritesPhotosDataService;
  const localStorageServiceStub = {
    getDataFromLocalStorage(key: 'test-key'): string | null {
      return null;
    },
    setDataToLocalStorage(key: 'test-key', value = 'value'): void {},
  } as LocalStorageService;
  const photoList: PhotoData[] = [
    {
      id: '1',
      imgUrl: 'test-url',
    },
    {
      id: '2',
      imgUrl: 'test-url2',
    },
  ];

  beforeEach(() => {
    service = new FavoritesPhotosDataService(localStorageServiceStub);
    service.favoritesPhotos$.next([...photoList]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of photos', async () => {
    const result = await firstValueFrom(service.getFavoritesPhotos());
    expect(result).toStrictEqual(photoList);
  });

  it('should return empty array', async () => {
    service.favoritesPhotos$.next([]);
    const result = await firstValueFrom(service.getFavoritesPhotos());
    expect(result).toStrictEqual([]);
  });

  it('should return photoItem by id', async () => {
    const id = '2';
    const result = await firstValueFrom(service.getFavoritePhoto(id));

    expect(result).toStrictEqual(photoList[1]);
  });

  it('should return null by wrong id', async () => {
    const id = '5';
    const result = await firstValueFrom(service.getFavoritePhoto(id));

    expect(result).toBeNull();
  });

  it('should add new photoItem to favorites photos', () => {
    const photoItem: PhotoData = {
      id: '3',
      imgUrl: 'test-url3',
    };
    service.addToFavoritesPhotos(photoItem);
    const result = service.favoritesPhotos$.getValue();

    expect(result).toStrictEqual([...photoList, photoItem]);
  });

  it('should not add existing photoItem to favorites photos', () => {
    const photoItem: PhotoData = {
      id: '2',
      imgUrl: 'test-url2',
    };
    service.addToFavoritesPhotos(photoItem);
    const result = service.favoritesPhotos$.getValue();

    expect(result).toStrictEqual([...photoList]);
  });

  it('should delete photoItem from favorites photos by id', () => {
    const id = '2';
    service.deleteFromFavoritesPhotos(id);
    const result = service.favoritesPhotos$.getValue();

    expect(result).toStrictEqual([photoList[0]]);
  });
});
