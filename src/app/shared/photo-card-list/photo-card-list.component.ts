import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoData } from '../models/photo-data.m';

@Component({
  selector: 'app-photo-card-list',
  templateUrl: './photo-card-list.component.html',
  styleUrls: ['./photo-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardListComponent {
  @Input() public photoList!: PhotoData[];
  @Output() public photoCardClicked = new EventEmitter<PhotoData>();

  public trackByFn(index: number, item: PhotoData): string {
    return item.id;
  }
}
