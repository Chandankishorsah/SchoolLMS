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
return this.http.get<{data:Students[]}>(`${this.apiBaseUrl}/students`,{headers:this.headers})
  }
  addStudent(student:Students){

   return this.http.post(`${this.apiBaseUrl}/students`,student,{headers:this.headers})
  }
  getStudentById(id:any){
return this.http.get(`${this.apiBaseUrl}/students/${id}`,{headers:this.headers})
  }
  updateStudent(body:Students,id:any){
return this.http.put(`${this.apiBaseUrl}/students/${id}`,body,{headers:this.headers})
  }

  CreateStudentEnrollment(data:any){
    return this.http.post(`${this.apiBaseUrl}/student-enrollments`,data,{headers:this.headers})
  }

  GetStudentEnrollments(){
    return this.http.get(`${this.apiBaseUrl}/student-enrollments`,{headers:this.headers})
  }

  GetstudentEnrollmentById(id:any){
    return this.http.get(`${this.apiBaseUrl}/student-enrollments/${id}`,{headers:this.headers})
  }
  UpdateStudentEnrollment(id:any,data:any){
    return this.http.put(`${this.apiBaseUrl}/student-enrollments/${id}`,data,{headers:this.headers})
  }

  DeleteStudentEnrollment(id:any){
    return this.http.delete(`${this.apiBaseUrl}/student-enrollments/${id}`,{headers:this.headers})
  }
ExportEnrollmentsToExcel(){
    return this.http.get(`${this.apiBaseUrl}/student-enrollments/enrolment/export-excel`,{headers:this.headers,responseType:'blob'})
  }

  CreateFeeStructure(data:any){
    return this.http.post(`${this.apiBaseUrl}/fee-structures`,data,{headers:this.headers})
  }
  GetAllFeeStructures(){
    return this.http.get(`${this.apiBaseUrl}/fee-structures`,{headers:this.headers})
  }
  GetFeeStructureById(id:any){
    return this.http.get(`${this.apiBaseUrl}/fee-structures/${id}`,{headers:this.headers})
  }
  UpdateFeeStructure(id:any,data:any){
    return this.http.put(`${this.apiBaseUrl}/fee-structures/${id}`,data,{headers:this.headers})
  }
  DeleteFeeStructure(id:any){
    return this.http.delete(`${this.apiBaseUrl}/fee-structures/${id}`,{headers:this.headers})
  }

  
  
}
