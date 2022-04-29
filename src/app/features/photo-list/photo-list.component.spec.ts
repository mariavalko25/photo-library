import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { PhotoListComponent } from './photo-list.component';
import { PhotoData } from '../../shared/models/photo-data.m';
import { PhotoListDataService } from '../../core/services/photo-list-data/photo-list-data.service';
import { Observable, of } from 'rxjs';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoListDataService: PhotoListDataService;
  let favoritesPhotosDataService: FavoritesPhotosDataService;
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
  const photoList$ = of(photoList);
  const mockPhotoListDataService = {
    getPhotoListData(page: number): Observable<PhotoData[]> {
      return photoList$;
    },
  };
  const mockFavoritesPhotosDataService = {
    addToFavoritesPhotos(item: PhotoData): void {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [PhotoListComponent],
      providers: [
        { provide: PhotoListDataService, useValue: mockPhotoListDataService },
        { provide: FavoritesPhotosDataService, useValue: mockFavoritesPhotosDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    photoListDataService = TestBed.inject(PhotoListDataService);
    favoritesPhotosDataService = TestBed.inject(FavoritesPhotosDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.page = 1;
    component.isLoading = false;
    jest.useFakeTimers();
    jest.runAllTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize photoList after Angular calls ngOnInit', () => {
    jest.useFakeTimers();
    jest.spyOn(photoListDataService, 'getPhotoListData');
    component.ngOnInit();
    expect(photoListDataService.getPhotoListData).toHaveBeenCalledWith(1);
    jest.runAllTimers();
    expect(component.photoList).toStrictEqual(photoList);
    expect(component.isLoading).toBeFalsy();
  });

  it('should update photoList after calls onScroll', () => {
    jest.spyOn(photoListDataService, 'getPhotoListData');
    component.photoList = [];
    component.onScroll();
    expect(photoListDataService.getPhotoListData).toHaveBeenCalledWith(2);
    jest.runAllTimers();
    expect(component.photoList).toStrictEqual(photoList);
    expect(component.isLoading).toBeFalsy();
    expect(component.page).toBe(2);
  });

  it('should onPhotoCardClick be called', () => {
    jest.spyOn(favoritesPhotosDataService, 'addToFavoritesPhotos');
    component.onPhotoCardClick(photoList[0]);
    expect(favoritesPhotosDataService.addToFavoritesPhotos).toHaveBeenCalledWith(photoList[0]);
  });
});
