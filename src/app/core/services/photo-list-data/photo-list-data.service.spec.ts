import { TestBed } from '@angular/core/testing';

import { PhotoListDataService } from './photo-list-data.service';

describe('PhotoListDataService', () => {
  let service: PhotoListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
