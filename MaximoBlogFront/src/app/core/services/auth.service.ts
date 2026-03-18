import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('maximo_token', res.token);
          if (res.name) localStorage.setItem('maximo_user_name', res.name);
          if (res.email) localStorage.setItem('maximo_user_email', res.email);
          if (res.role) localStorage.setItem('maximo_user_role', res.role);
        }
      })
    );
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify?token=${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  logout(): void {
    localStorage.removeItem('maximo_token');
    localStorage.removeItem('maximo_user_name');
    localStorage.removeItem('maximo_user_email');
    localStorage.removeItem('maximo_user_role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('maximo_token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('maximo_user_role') === 'ADMIN';
  }

  getCurrentUser() {
    return {
      name: localStorage.getItem('maximo_user_name'),
      email: localStorage.getItem('maximo_user_email'),
      role: localStorage.getItem('maximo_user_role')
    };
  }
}
