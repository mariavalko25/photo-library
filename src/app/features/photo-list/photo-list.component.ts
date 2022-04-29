import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { PhotoListDataService } from '../../core/services/photo-list-data/photo-list-data.service';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';
import { delay, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoListComponent implements OnInit, OnDestroy {
  public photoList!: PhotoData[];
  public page = 1;
  public isLoading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private photoListDataService: PhotoListDataService,
    private favoritesPhotosDataService: FavoritesPhotosDataService,
    private cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;
    this.getPhotoListData(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoList: PhotoData[]) => {
        this.photoList = photoList;
        this.isLoading = false;
        this.cdRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onPhotoCardClick(photoCard: PhotoData): void {
    this.favoritesPhotosDataService.addToFavoritesPhotos(photoCard);
  }

  public onScroll(): void {
    this.isLoading = true;
    this.page++;
    this.getPhotoListData(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((photoList: PhotoData[]) => {
        this.photoList = [...this.photoList, ...photoList];
        this.isLoading = false;
        this.cdRef.markForCheck();
      });
  }

  private getPhotoListData(page: number): Observable<PhotoData[]> {
    return this.photoListDataService.getPhotoListData(page).pipe(delay(1000));
  }
}
