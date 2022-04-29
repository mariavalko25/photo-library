import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';
import { PhotoData } from '../../shared/models/photo-data.m';
import { FavoritesPhotosComponent } from './favorites-photos.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';

describe('FavoritesPhotosComponent', () => {
  let component: FavoritesPhotosComponent;
  let fixture: ComponentFixture<FavoritesPhotosComponent>;
  let favoritesPhotosDataService: FavoritesPhotosDataService;
  let router: Router;
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
  const mockFavoritesPhotosDataService = {
    getFavoritesPhotos(): Observable<PhotoData[]> {
      return of(photoList);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'photos/:id', component: PhotoDetailsComponent }]), SharedModule],
      declarations: [FavoritesPhotosComponent],
      providers: [{ provide: FavoritesPhotosDataService, useValue: mockFavoritesPhotosDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPhotosComponent);
    favoritesPhotosDataService = TestBed.inject(FavoritesPhotosDataService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onInit be called', () => {
    jest.spyOn(favoritesPhotosDataService, 'getFavoritesPhotos');
    component.ngOnInit();
    component.favoritesPhotos$.subscribe((items) => {
      expect(items).toStrictEqual(photoList);
    });
    expect(favoritesPhotosDataService.getFavoritesPhotos).toHaveBeenCalled();
  });

  it('should onPhotoCardClick be called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onPhotoCardClick(photoList[0]);
    expect(navigateSpy).toHaveBeenCalledWith(['/photos', photoList[0].id]);
  });
});
