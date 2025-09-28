import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  id: string;
  name: string;
}
@Component({
  selector: 'app-schools-manager',
  standalone: true,
  imports: [CommonModule, NgClass, NgFor, ReactiveFormsModule],
  templateUrl: './schools-manager.component.html',
  styleUrl: './schools-manager.component.scss',
})
export class SchoolsManagerComponent {
  currentuser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
  schools: School[] = [];

  managers: SchoolManager[] = [];
  managerForm: any = FormGroup;
  isSubmitted = false;
  isLoading = false;
  managerId: any;
  roles: role[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AdminService: AdminService
  ) {
    this.managerForm = this.fb.group({
      schoolId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', [Validators.required]],
      status: ['active', Validators.required],
    });
  }
  get f() {
    return this.managerForm.controls;
  }
  ngOnInit() {
    this.getUsers();
    this.getAllSchools();
    this.GetAllRoles();
  }

  GetAllRoles() {
    this.AdminService.GetAllRoles().subscribe({
      next: (response: any) => {
        console.log('Fetched roles:', response);
        this.roles = response.data;
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      },
    });
  }
  addManager() {
    if (this.managerForm.valid) {
      const newUser: any = {
        ...this.managerForm.value,
      };
      newUser.schoolId = Number(newUser.schoolId);
      newUser.roleId = Number(newUser.roleId);
      this.AdminService.CreateUser(newUser).subscribe({
        next: (response: any) => {
          console.log('School manager added successfully:', response);
          if (response && response.data) {
            this.getUsers();

            this.managerForm.reset({ status: 'active' });
            this.closeModal('addSchoolManagerModal');
            alert(response.message);
          }
        },
      }),
        (error: any) => {
          console.error('Error adding school manager:', error);
          alert('Failed to add school manager. Please try again.');
        };
    }
  }
  openModal(id: any) {
    const modalEl = document.getElementById(id);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  closeModal(id: any) {
    this.f.schoolId.enable();
    this.managerForm.reset({ status: 'active', schoolId: '', roleId: '' });

    const modalEl = document.getElementById(id);
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
      modal.hide();
    }
  }

  getUsers() {
    this.AdminService.GetAllUsers().subscribe({
      next: (response: any) => {
        console.log('Fetched users:', response);
        this.managers = response.data.data; // Assuming the API returns an array of users in response.data
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  getAllSchools() {
    this.AdminService.GetAllSchools().subscribe({
      next: (response: any) => {
        console.log('Fetched schools:', response);
        this.schools = response.data.data; // Assuming the API returns an array of schools in response.data
      },
      error: (error) => {
        console.error('Error fetching schools:', error);
      },
    });
  }

  getSchoolManagerDetails(id: any) {
    this.AdminService.GetUserById(id).subscribe({
      next: (response: any) => {
        console.log('Fetched school details:', response);
        if (response && response.data) {
          this.managerId = response.data.id;
          console.log('scholl ID set to:', response.data.schoolId);
          this.managerForm.patchValue({
            schoolId: response.data.schoolId.toString(),
            name: response.data.name,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
            roleId: response.data.roleId,
            // password: response.data.password,
            status: response.data.status,
          });
          this.f.password.clearValidators();
          this.f.password.updateValueAndValidity();
      console.log('Form Values get:', this.managerForm.value);

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
      // Form se saari values nikali
      console.log('Form Values:', this.managerForm.value);
      const formValues = this.managerForm.value;

      // Sirf unhi keys ko rakho jinki value null/undefined/"" nahi hai
      const updatedUser: any = {};
      Object.keys(formValues).forEach((key) => {
        const value = formValues[key];
        if (value !== null && value !== undefined && value !== '') {
          updatedUser[key] = value;
        }
      });

      // Number conversion yahan karo
      if (updatedUser.schoolId) {
        updatedUser.schoolId = Number(updatedUser.schoolId);
      }
      if (updatedUser.roleId) {
        updatedUser.roleId = Number(updatedUser.roleId);
      }

      console.log('Final object sending to API:', updatedUser);

      this.AdminService.UpdateUser(this.managerId, updatedUser).subscribe({
        next: (response: any) => {
          alert(response.message);
          if (response && response.data) {
            console.log('Updated successfully:', response);
            this.getUsers();
            this.managerForm.reset({ status: 'active' });
            this.closeModal('editSchoolManagerModal');
          }
        },
        error: (err: any) => {
          console.error('Error updating manager:', err);
          alert('Failed to update manager. Please try again.');
        },
      });
    }
  }
}
