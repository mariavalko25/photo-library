import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { PhotoDataResponse } from '../models/photo-data-response.m';
const API_URL = 'https://picsum.photos/v2/list';

@Injectable({
  providedIn: 'root',
})
export class PhotoListDataService {
  constructor(private http: HttpClient) {}

  public getPhotoListData(page: number): Observable<PhotoData[]> {
    const limit = 20;
    const params = new HttpParams({ fromObject: { page, limit } });

    return this.http.get<PhotoDataResponse[]>(API_URL, { params }).pipe(
      map((photoListResponse: PhotoDataResponse[]) => photoListResponse.map((item) => ({ id: item.id, imgUrl: item.download_url }))),
      catchError(() => EMPTY),
    );
  }
}
