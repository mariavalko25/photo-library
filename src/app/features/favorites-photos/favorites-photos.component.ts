import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';
import { PhotoData } from 'src/app/shared/models/photo-data.m';

@Component({
  selector: 'app-favorites-photos',
  templateUrl: './favorites-photos.component.html',
  styleUrls: ['./favorites-photos.component.scss'],
})
export class FavoritesPhotosComponent implements OnInit {
  public favoritesPhotos$!: Observable<PhotoData[]>;

  constructor(private router: Router, private favoritesPhotosDataService: FavoritesPhotosDataService) {}

  public ngOnInit(): void {
    this.favoritesPhotos$ = this.favoritesPhotosDataService.getFavoritesPhotos();
  }

  public onPhotoCardClick(photoCard: PhotoData): void {
    this.router.navigate(['/photos', photoCard.id]);
  }
}
