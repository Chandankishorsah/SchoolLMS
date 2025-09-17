import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiBaseUrl = environment.apiUrl
  constructor(private http:HttpClient) { }
  CreateUser(data:any){
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.post(`${this.apiBaseUrl}/users`,data,{ headers });
  }
  GetUsers()
  {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get(`${this.apiBaseUrl}/users`,{ headers });
  }
  UpdateUser(id:string,data:any){
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.put(`${this.apiBaseUrl}/users/${id}`,data,{ headers });
  }
  DeleteUser(id:string){
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.delete(`${this.apiBaseUrl}/users/${id}`,{ headers });
  }
  GetAllUsers(){
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return this.http.get(`${this.apiBaseUrl}/users`,{ headers });
  }
  
}
