import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../../core/models/user.model';
import { AdminService } from '../../../../../core/services/Admin/admin.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
interface SchoolFee {
  id: number;
  schoolName: string;
  studentName: string;
  class: string;
  totalFee: number;
  paidFee: number;
  status: 'Paid' | 'Unpaid' | 'Partial';
}
interface School {
  id: number;
  name: string;
  domain: string;
  status: 'active' | 'inactive';
}
@Component({
  selector: 'app-schools-all',
  standalone: true,
  imports: [NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './schools-all.component.html',
  styleUrl: './schools-all.component.scss',
})
export class SchoolsAllComponent {
  feesData: SchoolFee[] = [
    {
      id: 1,
      schoolName: 'Sunrise Public School',
      studentName: 'Rahul Sharma',
      class: '5th',
      totalFee: 20000,
      paidFee: 20000,
      status: 'Paid',
    },
    {
      id: 2,
      schoolName: 'Sunrise Public School',
      studentName: 'Priya Singh',
      class: '6th',
      totalFee: 25000,
      paidFee: 15000,
      status: 'Partial',
    },
    {
      id: 3,
      schoolName: 'Green Valley School',
      studentName: 'Aman Verma',
      class: '8th',
      totalFee: 30000,
      paidFee: 0,
      status: 'Unpaid',
    },
    {
      id: 4,
      schoolName: 'Green Valley School',
      studentName: 'Sneha Gupta',
      class: '7th',
      totalFee: 28000,
      paidFee: 28000,
      status: 'Paid',
    },
    {
      id: 5,
      schoolName: 'St. Mary’s School',
      studentName: 'Arjun Mehta',
      class: '9th',
      totalFee: 32000,
      paidFee: 20000,
      status: 'Partial',
    },
    {
      id: 6,
      schoolName: 'St. Mary’s School',
      studentName: 'Neha Reddy',
      class: '10th',
      totalFee: 35000,
      paidFee: 0,
      status: 'Unpaid',
    },
    {
      id: 7,
      schoolName: 'Bright Future Academy',
      studentName: 'Karan Patel',
      class: '4th',
      totalFee: 18000,
      paidFee: 18000,
      status: 'Paid',
    },
    {
      id: 8,
      schoolName: 'Bright Future Academy',
      studentName: 'Ishita Roy',
      class: '3rd',
      totalFee: 16000,
      paidFee: 5000,
      status: 'Partial',
    },
    {
      id: 9,
      schoolName: 'National Public School',
      studentName: 'Ravi Kumar',
      class: '11th',
      totalFee: 40000,
      paidFee: 20000,
      status: 'Partial',
    },
    {
      id: 10,
      schoolName: 'National Public School',
      studentName: 'Meera Nair',
      class: '12th',
      totalFee: 42000,
      paidFee: 42000,
      status: 'Paid',
    },
    {
      id: 11,
      schoolName: 'Oxford International',
      studentName: 'Aditya Singh',
      class: '2nd',
      totalFee: 15000,
      paidFee: 0,
      status: 'Unpaid',
    },
    {
      id: 12,
      schoolName: 'Oxford International',
      studentName: 'Simran Kaur',
      class: '1st',
      totalFee: 14000,
      paidFee: 14000,
      status: 'Paid',
    },
    {
      id: 13,
      schoolName: 'Modern Convent',
      studentName: 'Harsh Yadav',
      class: '7th',
      totalFee: 27000,
      paidFee: 15000,
      status: 'Partial',
    },
    {
      id: 14,
      schoolName: 'Modern Convent',
      studentName: 'Ananya Joshi',
      class: '6th',
      totalFee: 26000,
      paidFee: 26000,
      status: 'Paid',
    },
    {
      id: 15,
      schoolName: 'Delhi Public School',
      studentName: 'Rohan Malhotra',
      class: '9th',
      totalFee: 33000,
      paidFee: 0,
      status: 'Unpaid',
    },
    {
      id: 16,
      schoolName: 'Delhi Public School',
      studentName: 'Tanya Kapoor',
      class: '8th',
      totalFee: 31000,
      paidFee: 20000,
      status: 'Partial',
    },
    {
      id: 17,
      schoolName: 'Little Flower School',
      studentName: 'Nikhil Jain',
      class: '5th',
      totalFee: 22000,
      paidFee: 22000,
      status: 'Paid',
    },
    {
      id: 18,
      schoolName: 'Little Flower School',
      studentName: 'Shivani Das',
      class: '4th',
      totalFee: 19000,
      paidFee: 0,
      status: 'Unpaid',
    },
    {
      id: 19,
      schoolName: 'Springfield Academy',
      studentName: 'Akash Gupta',
      class: '11th',
      totalFee: 38000,
      paidFee: 18000,
      status: 'Partial',
    },
    {
      id: 20,
      schoolName: 'Springfield Academy',
      studentName: 'Pooja Mishra',
      class: '12th',
      totalFee: 40000,
      paidFee: 40000,
      status: 'Paid',
    },
    {
      id: 21,
      schoolName: 'Global International',
      studentName: 'Vikas Chauhan',
      class: '10th',
      totalFee: 36000,
      paidFee: 10000,
      status: 'Partial',
    },
    {
      id: 22,
      schoolName: 'Global International',
      studentName: 'Ritika Sharma',
      class: '9th',
      totalFee: 34000,
      paidFee: 34000,
      status: 'Paid',
    },
  ];
  schools: School[] = [];
  schoolForm: any = FormGroup;
  currentuser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
  schoolId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AdminService: AdminService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['active', Validators.required],
      domain: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
    });
  }

  ngOnInit() {
    this.getAllSchools();
  }
  submitForm() {
    if (this.schoolForm.valid) {
      const newSchool: any = {
        roleId: this.currentuser.roleId,
        ...this.schoolForm.value,
      };
      this.AdminService.CreateSchool(newSchool).subscribe({
        next: (response: any) => {
          alert(response.message);
          console.log('School added successfully:', response);
          this.schools.push({ id: response.data.id, ...this.schoolForm.value });
          this.schoolForm.reset({ status: 'active' });
          this.closeModal('addSchoolModal');
        },
      });
    }
  }

   openModal(id: any) {
    const modalElement = document.getElementById(id); // Get modal element

    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  closeModal(id: any) {
    const modalElement = document.getElementById(id); // Get modal element

    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }

  SchoolSettings(url: any) {
    this.router.navigateByUrl('/super-admin/schools/' + url);
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
  getSchoolDetails(id: any) {
    this.AdminService.GetSchoolById(id).subscribe({
      next: (response: any) => {
        console.log('Fetched school details:', response);
        if (response && response.data) {
          this.schoolForm.patchValue({
            name: response.data.name,
            domain: response.data.domain,
            status: response.data.status,
          });
          this.schoolId = response.data.id;
          this.openModal('editSchoolModal');
        }
        // Handle the fetched school details as needed
      },
      error: (error:any) => {
        console.error('Error fetching school details:', error);
      },
    });
  }
  UpdateSchool() {
    if (this.schoolForm.valid) {
      const updatedSchool: any = {
        roleId: this.currentuser.roleId,
        ...this.schoolForm.value,
      };
      this.AdminService.UpdateSchool(this.schoolId, updatedSchool).subscribe({
        next: (response: any) => {
          alert(response.message);
          console.log('School updated successfully:', response);
          this.getAllSchools();
          this.schoolForm.reset({ status: 'active' });
          this.closeModal('editSchoolModal');
        },
      });
    }
  }
  deleteSchool(id: any) {
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
}
