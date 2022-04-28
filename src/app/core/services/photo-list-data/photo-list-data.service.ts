import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { PhotoDataResponse } from '../models/photo-data-response.m';
const API_URL = 'https://picsum.photos/v2/list';

@Injectable({
  providedIn: 'root',
})
export class PhotoListDataService {
  public photoList$ = new BehaviorSubject<PhotoData[]>([]);

  constructor(private http: HttpClient) {}

  public getPhotoListData(page: number): Observable<PhotoData[]> {
    const limit = 10;
    const params = new HttpParams({ fromObject: { page, limit } });

    return this.http.get<PhotoDataResponse[]>(API_URL, { params }).pipe(
      map((photoListResponse: PhotoDataResponse[]) => {
        const photoList: PhotoData[] = photoListResponse.map((item) => ({ id: item.id, imgUrl: item.download_url }));
        this.updatePhotoList(photoList);
        return photoList;
      }),
      catchError((error: HttpErrorResponse) => {
        // eslint-disable-next-line no-console
        console.log('Something went wrong! Try again');
        return EMPTY;
      }),
    );
  }

  private updatePhotoList(newPhotoList: PhotoData[]): void {
    const photoList = this.photoList$.getValue();
    this.photoList$.next([...photoList, ...newPhotoList]);
  }
}
