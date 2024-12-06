import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key)
  }

  setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  removeItem(key: string) {
    console.log(key)
    localStorage.removeItem(key);
  }
}
