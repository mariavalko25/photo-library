import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public getDataFromLocalStorage(key: string): string | null {
    return JSON.parse(<string>localStorage.getItem(key)) || null;
  }

  public setDataToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
