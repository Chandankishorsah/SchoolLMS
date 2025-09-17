import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../../core/models/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../core/services/Admin/admin.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;
interface SchoolManager {
  id: number;
  school: School;
  name: string;
  email: string;
  role: role;
  phoneNumber: string;
  status: 'active' | 'inactive';
}
interface School {
  id: number;
  name: string;
  domain: string;
  status: 'active' | 'inactive';


}
interface role {
  id:string;
  name: string;
}
@Component({
  selector: 'app-schools-manager',
  standalone: true,
  imports: [CommonModule, NgClass,NgFor,ReactiveFormsModule],
  templateUrl: './schools-manager.component.html',
  styleUrl: './schools-manager.component.scss'
})
export class SchoolsManagerComponent {
  currentuser:User= JSON.parse(localStorage.getItem('currentUser') || '{}');
  schools: School[] = [];

managers: SchoolManager[] = [];
  managerForm:any= FormGroup;
  isSubmitted = false;
  isLoading = false;
  managerId:any;
  constructor(private fb: FormBuilder,private router:Router,private AdminService:AdminService) {
    this.managerForm = this.fb.group({
      schoolId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],

      status: ['active', Validators.required],
    });

    // preload 25 dummy managers
  
  }
get f() {
    return this.managerForm.controls;
  }
  addManager() {
    if (this.managerForm.valid) {
      const newManager: any = {
        roleId: this.currentuser.roleId,
        password:"123456",
        ...this.managerForm.value
      };
      newManager.schoolId=Number(newManager.schoolId);
      this.AdminService.CreateUser(newManager).subscribe({
        next: (response:any) => {
          console.log('School manager added successfully:', response);  

    }})
      // this.managers.push(newManager);
      // this.managerForm.reset({ status: 'active' });
    }
  }
   openModal(id: any) {
    const modalEl = document.getElementById(id);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  closeModal(id: any) {
    const modalEl = document.getElementById(id);
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
      modal.hide();
    }
  }

  getUsers() {
    this.AdminService.GetAllUsers().subscribe({
      next: (response:any) => {
        console.log('Fetched users:', response);
        this.managers = response.data.data; // Assuming the API returns an array of users in response.data
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

  }
  
  getAllSchools(){
    this.AdminService.GetAllSchools().subscribe({
      next: (response:any) => {
        console.log('Fetched schools:', response);
        this.schools = response.data.data; // Assuming the API returns an array of schools in response.data
      },
      error: (error) => {
        console.error('Error fetching schools:', error);
      }
    });
  }

  ngOnInit(){
    this.getUsers();
    this.getAllSchools();
  }
  getSchoolManagerDetails(id: any) {
    this.AdminService.GetUserByID(id).subscribe({
      next: (response: any) => {
        console.log('Fetched school details:', response);
        if (response && response.data) {
          this.managerId=response.data.id;
          this.managerForm.patchValue({
            schoolId: response.data.schoolId,
            name: response.data.name,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            status: response.data.status,
          });
          this.openModal('editSchoolManagerModal');
        }
        // Handle the fetched school details as needed
      },
      error: (error) => {
        console.error('Error fetching school details:', error);
      },
    });
  }
  deleteSchoolManager(id: any) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // 🔥 Call API here
          this.AdminService.DeleteSchool(id).subscribe({
            next: (res) => {
              Swal.fire('Deleted!', 'The manager has been deleted.', 'success');
              // reload list if needed
              this.getAllSchools();
            },
            error: (err) => {
              Swal.fire('Error!', 'Something went wrong.', 'error');
            },
          });
        }
      });
    }

     UpdateSchoolManager() {
    if (this.managerForm.valid) {
      const updatedUser: any = {
        roleId: this.currentuser.roleId,
        ...this.managerForm.value,
      };
      this.AdminService.UpdateSchool(this.managerId, updatedUser).subscribe({
        next: (response: any) => {
          alert(response.message);
          console.log(' updated successfully:', response);
          this.getAllSchools();
          this.managerForm.reset({ status: 'active' });
          this.closeModal('editSchoolManagerModal');
        },
      });
    }
  }
}
