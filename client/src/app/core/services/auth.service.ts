import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlLogin = 'http://localhost:3000/api/pourlaforme/auth/login';
  private apiUrlRegister = 'http://localhost:3000/api/pourlaforme/auth/register';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, data);
  }

  logout(): void {
    localStorage.removeItem('user'); // Supprime l'utilisateur du stockage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Vérifie si un utilisateur est connecté
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user') || 'null'); // Récupère l'utilisateur stocké
  }
}
