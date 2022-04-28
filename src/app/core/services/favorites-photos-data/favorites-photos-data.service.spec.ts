import { TestBed } from '@angular/core/testing';

import { FavoritesPhotosDataService } from './favorites-photos-data.service';

describe('FavoritesPhotosDataService', () => {
  let service: FavoritesPhotosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesPhotosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
