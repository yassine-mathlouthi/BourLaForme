import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SafeStorageService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined'; // Vérifie si l'environnement est un navigateur
  }

  getItem(key: string): string | null {
    return this.isBrowser ? sessionStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }
}
