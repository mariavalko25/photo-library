import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FavoritesPhotosDataService } from '../../core/services/favorites-photos-data/favorites-photos-data.service';
import { PhotoData } from '../../shared/models/photo-data.m';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsComponent implements OnInit {
  public photoCardData$!: Observable<PhotoData | null>;

  constructor(private route: ActivatedRoute, private favoritesPhotosDataService: FavoritesPhotosDataService, private router: Router) {}

  public ngOnInit(): void {
    this.photoCardData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.favoritesPhotosDataService.getFavoritePhoto(params.get('id')!)),
    );
  }

  public onDeletePhotoFromFavorites(id: string): void {
    this.favoritesPhotosDataService.deleteFromFavoritesPhotos(id);
    this.router.navigate(['/favorites']);
  }
}
