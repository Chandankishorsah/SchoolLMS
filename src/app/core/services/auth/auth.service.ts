import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of, tap, catchError, throwError } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiBaseUrl = environment.apiUrl  // <-- Set your real API base URL

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/auth/login`, credentials).pipe(
      tap((user:any) => {
if(user && user.data && user.data.user.roleId=='1'){
  user.data.user.role='super-admin';
}
        localStorage.setItem('currentUser', JSON.stringify(user.data.user));
        localStorage.setItem('token', user.data.token);
        this.currentUserSubject.next(user.data.user);
      }),
      catchError(error => {
        console.error('Login API Error:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterData): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/auth/register`, data).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('Register API Error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get userRole(): string {
    return this.currentUser?.role || '';
  }

  getUserInfo(): void {
    console.log('Current User:', this.currentUser);
    console.log('Is Authenticated:', this.isAuthenticated);
    console.log('User Role:', this.userRole);
    console.log('LocalStorage Data:', localStorage.getItem('currentUser'));
  }

  clearAuthData(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}