import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of, tap, catchError, throwError } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
router= inject(Router);
  // Mock users for demonstration
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'superadmin@school.com',
      name: 'Super Admin',
      role: 'super-admin',
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'schooladmin@greenwood.com',
      name: 'John Smith',
      role: 'school-admin',
      schoolId: '1',
      schoolName: 'Greenwood High School',
      createdAt: new Date()
    },
    {
      id: '3',
      email: 'parent@example.com',
      name: 'Jane Doe',
      role: 'parent',
      schoolId: '1',
      schoolName: 'Greenwood High School',
      createdAt: new Date()
    }
  ];

  constructor() {
    // Check for stored user on service initialization
    const storedUser = localStorage.getItem('currentUser');
    console.log('AuthService initialized, stored user:', storedUser); // Debug
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        console.log('User restored from localStorage:', user); // Debug
      } catch (error) {
        console.error('Error parsing stored user:', error); // Debug
        localStorage.removeItem('currentUser'); // Clear corrupted data
      }
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    console.log('Login attempt with credentials:', credentials); // Debug
    
    return of(null).pipe(
      delay(1500), // Simulate API delay
      map(() => {
        const user = this.mockUsers.find(u => u.email === credentials.email);
        console.log('Found user:', user); // Debug
        
        if (user && credentials.password === 'password') {
          // Store user data
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          console.log('Login successful for user:', user.name, 'Role:', user.role); // Debug
          return user;
        } else {
          console.error('Login failed - Invalid credentials'); // Debug
          throw new Error('Invalid credentials');
        }
      }),
      tap(user => {
        console.log('Login observable completed successfully:', user); // Debug
      }),
      catchError(error => {
        console.error('Login observable error:', error); // Debug
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterData): Observable<User> {
    console.log('Register attempt with data:', data); // Debug
    
    return of(null).pipe(
      delay(1500),
      map(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: data.role,
          schoolId: data.schoolId,
          createdAt: new Date()
        };
        
        this.mockUsers.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        
        console.log('Registration successful for user:', newUser); // Debug
        return newUser;
      }),
      catchError(error => {
        console.error('Registration error:', error); // Debug
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    console.log('Logout called'); // Debug
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate([''])
    console.log('User logged out successfully'); // Debug
  }

  get currentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('Getting current user:', user); // Debug
    return user;
  }

  get isAuthenticated(): boolean {
    const isAuth = this.currentUser !== null;
    console.log('Is authenticated:', isAuth); // Debug
    return isAuth;
  }

  get userRole(): string {
    const role = this.currentUser?.role || '';
    console.log('Getting user role:', role); // Debug
    return role;
  }

  // ✅ Additional helper method for debugging
  getUserInfo(): void {
    console.log('=== AUTH SERVICE DEBUG INFO ===');
    console.log('Current User:', this.currentUser);
    console.log('Is Authenticated:', this.isAuthenticated);
    console.log('User Role:', this.userRole);
    console.log('LocalStorage Data:', localStorage.getItem('currentUser'));
    console.log('===============================');
  }

  // ✅ Method to clear all auth data (useful for debugging)
  clearAuthData(): void {
    console.log('Clearing all auth data...'); // Debug
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('Auth data cleared'); // Debug
  }
}