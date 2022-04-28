import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoData } from '../models/photo-data.m';

@Component({
  selector: 'app-photo-card-list',
  templateUrl: './photo-card-list.component.html',
  styleUrls: ['./photo-card-list.component.scss'],
})
export class PhotoCardListComponent {
  @Input() public photoList!: PhotoData[];
  @Output() public photoCardClicked = new EventEmitter<PhotoData>();
}
