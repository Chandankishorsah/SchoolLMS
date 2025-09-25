import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly apiBaseUrl = `${environment.apiUrl}/classes`;

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  createClass(data: any) {
    return this.http.post(this.apiBaseUrl, data, { headers: this.headers });
  }

  getAllClasses() {
    return this.http.get(this.apiBaseUrl, { headers: this.headers });
  }

  getClassById(id: string | number) {
    return this.http.get(`${this.apiBaseUrl}/${id}`, { headers: this.headers });
  }

  updateClass(id: string | number, data: any) {
    return this.http.put(`${this.apiBaseUrl}/${id}`, data, { headers: this.headers });
  }
}
