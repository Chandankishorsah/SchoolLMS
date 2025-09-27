import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Students } from '../../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly apiBaseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  getAllStudents(){

  }
  addStudent(student:Students){

   return this.http.post(`${this.apiBaseUrl}/students`,student,{headers:this.headers})
  }
  getStudentById(){

  }
  updateStudent(){

  }

  
}
