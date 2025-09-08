import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

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
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    return of(null).pipe(
      delay(1500), // Simulate API delay
      map(() => {
        const user = this.mockUsers.find(u => u.email === credentials.email);
        if (user && credentials.password === 'password') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  register(data: RegisterData): Observable<User> {
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
        return newUser;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
}
