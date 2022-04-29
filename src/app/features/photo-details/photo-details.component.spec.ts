import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';
import { PhotoData } from '../../shared/models/photo-data.m';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesPhotosComponent } from '../favorites-photos/favorites-photos.component';

import { PhotoDetailsComponent } from './photo-details.component';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let favoritesPhotosDataService: FavoritesPhotosDataService;
  const photoData: PhotoData = {
    id: '1',
    imgUrl: 'test-url',
  };
  const mockFavoritesPhotosDataService = {
    deleteFromFavoritesPhotos(item: PhotoData): void {},
    getFavoritePhoto(id: string): PhotoData {
      return photoData;
    },
  };
  const mockActivatedRoute = {
    paramMap: of({ get: (id: string) => '1' }),
  };
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'favorites', component: FavoritesPhotosComponent }]), SharedModule],
      declarations: [PhotoDetailsComponent],
      providers: [
        { provide: FavoritesPhotosDataService, useValue: mockFavoritesPhotosDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    favoritesPhotosDataService = TestBed.inject(FavoritesPhotosDataService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onInit be called', () => {
    jest.spyOn(favoritesPhotosDataService, 'getFavoritePhoto');
    component.ngOnInit();
    component.photoCardData$.subscribe((item) => {
      expect(item).toStrictEqual(photoData);
    });
    expect(favoritesPhotosDataService.getFavoritePhoto).toHaveBeenCalledWith(photoData.id);
  });

  it('should onDeletePhotoFromFavorites be called', () => {
    jest.spyOn(favoritesPhotosDataService, 'deleteFromFavoritesPhotos');
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onDeletePhotoFromFavorites(photoData.id);
    expect(favoritesPhotosDataService.deleteFromFavoritesPhotos).toHaveBeenCalledWith(photoData.id);
    expect(navigateSpy).toHaveBeenCalledWith(['/favorites']);
  });
});
