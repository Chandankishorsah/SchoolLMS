import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../../core/models/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../core/services/Admin/admin.service';
interface SchoolManager {
  id: number;
  schoolName: string;
  managerName: string;
  email: string;
  role: string;
  phone: string;
  status: 'Active' | 'Inactive';
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
managers: SchoolManager[] = [
    { id: 1, schoolName: 'Green Valley High', managerName: 'Amit Sharma', email: 'amit@greenvalley.edu', role: 'Principal', phone: '9876543210', status: 'Active' },
    { id: 2, schoolName: 'Sunrise Public', managerName: 'Priya Singh', email: 'priya@sunrise.edu', role: 'Vice Principal', phone: '9876543211', status: 'Inactive' },
    { id: 3, schoolName: 'St. Joseph Academy', managerName: 'Rajesh Kumar', email: 'rajesh@stjoseph.edu', role: 'Manager', phone: '9876543212', status: 'Active' },
    { id: 4, schoolName: 'Oxford International', managerName: 'Sneha Verma', email: 'sneha@oxford.com', role: 'Principal', phone: '9876543213', status: 'Active' },
    { id: 5, schoolName: 'Riverdale High', managerName: 'Karan Malhotra', email: 'karan@riverdale.edu', role: 'Admin Head', phone: '9876543214', status: 'Inactive' },
    { id: 6, schoolName: 'Springfield School', managerName: 'Meena Iyer', email: 'meena@springfield.org', role: 'Manager', phone: '9876543215', status: 'Active' },
    { id: 7, schoolName: 'Heritage Academy', managerName: 'Ravi Kapoor', email: 'ravi@heritage.edu', role: 'Principal', phone: '9876543216', status: 'Active' },
    { id: 8, schoolName: 'Mount Carmel', managerName: 'Neha Gupta', email: 'neha@mtcarmel.edu', role: 'Vice Principal', phone: '9876543217', status: 'Inactive' },
    { id: 9, schoolName: 'Silver Oaks', managerName: 'Arjun Patel', email: 'arjun@silveroaks.org', role: 'Manager', phone: '9876543218', status: 'Active' },
    { id: 10, schoolName: 'Global International', managerName: 'Shweta Nair', email: 'shweta@globalint.com', role: 'Principal', phone: '9876543219', status: 'Active' },
    { id: 11, schoolName: 'Bright Future Academy', managerName: 'Suresh Mehta', email: 'suresh@brightfuture.edu', role: 'Manager', phone: '9876543220', status: 'Inactive' },
    { id: 12, schoolName: 'St. Xavier’s', managerName: 'Anita Reddy', email: 'anita@stxaviers.org', role: 'Vice Principal', phone: '9876543221', status: 'Active' },
    { id: 13, schoolName: 'Horizon Public', managerName: 'Manoj Tiwari', email: 'manoj@horizon.edu', role: 'Principal', phone: '9876543222', status: 'Active' },
    { id: 14, schoolName: 'Blue Bells Academy', managerName: 'Kavita Sharma', email: 'kavita@bluebells.edu', role: 'Manager', phone: '9876543223', status: 'Inactive' },
    { id: 15, schoolName: 'Royal Kids School', managerName: 'Deepak Jain', email: 'deepak@royalkids.edu', role: 'Principal', phone: '9876543224', status: 'Active' },
    { id: 16, schoolName: 'Knowledge Tree', managerName: 'Anjali Deshmukh', email: 'anjali@knowledgetree.edu', role: 'Vice Principal', phone: '9876543225', status: 'Active' },
    { id: 17, schoolName: 'Little Flower High', managerName: 'Pankaj Yadav', email: 'pankaj@littleflower.edu', role: 'Manager', phone: '9876543226', status: 'Inactive' },
    { id: 18, schoolName: 'New Era Public', managerName: 'Ritika Joshi', email: 'ritika@newera.org', role: 'Principal', phone: '9876543227', status: 'Active' },
    { id: 19, schoolName: 'Gyan Deep Academy', managerName: 'Vikram Chauhan', email: 'vikram@gyandeep.edu', role: 'Manager', phone: '9876543228', status: 'Active' },
    { id: 20, schoolName: 'St. Mary’s Convent', managerName: 'Pooja Saxena', email: 'pooja@stmarys.edu', role: 'Vice Principal', phone: '9876543229', status: 'Inactive' },
    { id: 21, schoolName: 'Dreamland School', managerName: 'Alok Sharma', email: 'alok@dreamland.edu', role: 'Principal', phone: '9876543230', status: 'Active' },
    { id: 22, schoolName: 'National Public', managerName: 'Shalini Menon', email: 'shalini@nps.edu', role: 'Manager', phone: '9876543231', status: 'Active' },
    { id: 23, schoolName: 'Carmel Convent', managerName: 'Harish Bhat', email: 'harish@carmel.edu', role: 'Admin Head', phone: '9876543232', status: 'Inactive' },
    { id: 24, schoolName: 'Future Leaders', managerName: 'Divya Rao', email: 'divya@futureleaders.org', role: 'Principal', phone: '9876543233', status: 'Active' },
    { id: 25, schoolName: 'Victory International', managerName: 'Nitin Arora', email: 'nitin@victoryint.edu', role: 'Vice Principal', phone: '9876543234', status: 'Active' },
  ];
  managerForm:any= FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private AdminService:AdminService) {
    this.managerForm = this.fb.group({
      schoolName: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      status: ['Active', Validators.required],
    });

    // preload 25 dummy managers
  
  }

  addManager() {
    if (this.managerForm.valid) {
      const newManager: SchoolManager = {
        roleId: this.currentuser.roleId,
        ...this.managerForm.value
      };
      this.AdminService.CreateUser(newManager).subscribe({
        next: (response:any) => {
          console.log('School manager added successfully:', response);  

    }})
      // this.managers.push(newManager);
      this.managerForm.reset({ status: 'Active' });
    }
  }
   openModal() {
    const modal = document.getElementById('addSchoolManagerModal');
    if (modal) modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('addSchoolManagerModal');
    if (modal) modal.style.display = 'none';
  }
}
