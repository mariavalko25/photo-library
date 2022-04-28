import { Component, OnInit } from '@angular/core';
import { PhotoData } from 'src/app/shared/models/photo-data.m';
import { PhotoListDataService } from '../../core/services/photo-list-data/photo-list-data.service';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  public photoList: PhotoData[] = [];

  constructor(private photoListDataService: PhotoListDataService, private favoritesPhotosDataService: FavoritesPhotosDataService) {}

  public ngOnInit(): void {
    this.photoListDataService.getPhotoListData(1).subscribe((photoList: PhotoData[]) => {
      this.photoList = photoList;
    });
  }

  public onPhotoCardClick(photoCard: PhotoData): void {
    this.favoritesPhotosDataService.addToFavoritesPhotos(photoCard);
  }
}
