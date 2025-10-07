import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Centralized headers
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // ---------- User APIs ----------
  CreateUser(data: any) {
    return this.http.post(`${this.apiBaseUrl}/users`, data, { headers: this.headers });
  }

  GetUserById(id: string | number) {
    return this.http.get(`${this.apiBaseUrl}/users/${id}`, { headers: this.headers });
  }

  UpdateUser(id: string | number, data: any) {
    return this.http.put(`${this.apiBaseUrl}/users/${id}`, data, { headers: this.headers });
  }

  DeleteUser(id: string | number) {
    return this.http.delete(`${this.apiBaseUrl}/users/${id}`, { headers: this.headers });
  }

  GetAllUsers() {
    return this.http.get(`${this.apiBaseUrl}/users`, { headers: this.headers });
  }

  // ---------- School APIs ----------
  CreateSchool(data: any) {
    return this.http.post(`${this.apiBaseUrl}/schools`, data, { headers: this.headers });
  }

  GetAllSchools() {
    return this.http.get(`${this.apiBaseUrl}/schools`, { headers: this.headers });
  }

  GetSchoolById(id: string | number) {
    return this.http.get(`${this.apiBaseUrl}/schools/${id}`, { headers: this.headers });
  }

  UpdateSchool(id: string | number, data: any) {
    return this.http.put(`${this.apiBaseUrl}/schools/${id}`, data, { headers: this.headers });
  }

  DeleteSchool(id: string | number) {
    return this.http.delete(`${this.apiBaseUrl}/schools/${id}`, { headers: this.headers });
  }

  // ---------- Role APIs ----------
  GetAllRoles() {
    return this.http.get(`${this.apiBaseUrl}/roles`, { headers: this.headers });
  }

  // ---------- Class APIs ----------
  CreateClass(data: any) {
    return this.http.post(`${this.apiBaseUrl}/classes`, data, { headers: this.headers });
  }

  GetAllClasses() {

    return this.http.get(`${this.apiBaseUrl}/classes`, { headers: this.headers });
  }

  GetClassById(id: string | number) {
    return this.http.get(`${this.apiBaseUrl}/classes/${id}`, { headers: this.headers });
  }

  UpdateClass(id: string | number, data: any) {
    return this.http.put(`${this.apiBaseUrl}/classes/${id}`, data, { headers: this.headers });
  }

  CreateAcademicYear(body: any) {
    return this.http.post(`${this.apiBaseUrl}/academic-years`, body, { headers: this.headers })
  }
  GetAllAcademicYear() {
    return this.http.get(`${this.apiBaseUrl}/academic-years`, { headers: this.headers })
  }
  GetAcademicYearById(id: any) {
    return this.http.get(`${this.apiBaseUrl}/academic-years/${id}`, { headers: this.headers })
  }
  UpdateAcademicYear(body: any, id: any) {
    return this.http.put(`${this.apiBaseUrl}/academic-years/${id}`, body, { headers: this.headers })
  }
  DeleteAcademicYear(id: any) {
    return this.http.delete(`${this.apiBaseUrl}/academic-years/${id}`, { headers: this.headers })
  }
}

