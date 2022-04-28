import { HttpClient, HttpParams } from '@angular/common/http';
import { MockService } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { PhotoListDataService } from './photo-list-data.service';
const API_URL = 'https://picsum.photos/v2/list';

describe('PhotoListDataService', () => {
  let service: PhotoListDataService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let httpClientMock: any;
  const responsePhotoList = [
    {
      id: '1',
      download_url: 'test-url',
    },
    {
      id: '2',
      download_url: 'test-url2',
    },
  ];
  const photoList$ = of(responsePhotoList);

  beforeEach(() => {
    httpClientMock = MockService(HttpClient);
    httpClientMock.get = jest.fn(() => photoList$);
    service = new PhotoListDataService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return the list of photos', async () => {
    const page = 1;
    const params = new HttpParams({ fromObject: { page, limit: 20 } });
    const result = await firstValueFrom(service.getPhotoListData(page));

    expect(httpClientMock.get).toHaveBeenCalled();
    expect(httpClientMock.get).toHaveLastReturnedWith(photoList$);
    expect(httpClientMock.get).toHaveBeenCalledWith(API_URL, { params });
    expect(result[0].id).toBe('1');
  });
});
