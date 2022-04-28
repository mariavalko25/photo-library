import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

import { FavoritesPhotosComponent } from './favorites-photos.component';

describe('FavoritesPhotosComponent', () => {
  let component: FavoritesPhotosComponent;
  let fixture: ComponentFixture<FavoritesPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [FavoritesPhotosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
