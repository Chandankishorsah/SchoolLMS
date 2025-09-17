import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  status: 'Active' | 'Inactive';
}
@Component({
  selector: 'app-schools-all',
  standalone: true,
  imports: [NgClass,CommonModule,ReactiveFormsModule],
  templateUrl: './schools-all.component.html',
  styleUrl: './schools-all.component.scss'
})
export class SchoolsAllComponent {
 feesData: SchoolFee[] = [
    { id: 1, schoolName: 'Sunrise Public School', studentName: 'Rahul Sharma', class: '5th', totalFee: 20000, paidFee: 20000, status: 'Paid' },
    { id: 2, schoolName: 'Sunrise Public School', studentName: 'Priya Singh', class: '6th', totalFee: 25000, paidFee: 15000, status: 'Partial' },
    { id: 3, schoolName: 'Green Valley School', studentName: 'Aman Verma', class: '8th', totalFee: 30000, paidFee: 0, status: 'Unpaid' },
    { id: 4, schoolName: 'Green Valley School', studentName: 'Sneha Gupta', class: '7th', totalFee: 28000, paidFee: 28000, status: 'Paid' },
    { id: 5, schoolName: 'St. Mary’s School', studentName: 'Arjun Mehta', class: '9th', totalFee: 32000, paidFee: 20000, status: 'Partial' },
    { id: 6, schoolName: 'St. Mary’s School', studentName: 'Neha Reddy', class: '10th', totalFee: 35000, paidFee: 0, status: 'Unpaid' },
    { id: 7, schoolName: 'Bright Future Academy', studentName: 'Karan Patel', class: '4th', totalFee: 18000, paidFee: 18000, status: 'Paid' },
    { id: 8, schoolName: 'Bright Future Academy', studentName: 'Ishita Roy', class: '3rd', totalFee: 16000, paidFee: 5000, status: 'Partial' },
    { id: 9, schoolName: 'National Public School', studentName: 'Ravi Kumar', class: '11th', totalFee: 40000, paidFee: 20000, status: 'Partial' },
    { id: 10, schoolName: 'National Public School', studentName: 'Meera Nair', class: '12th', totalFee: 42000, paidFee: 42000, status: 'Paid' },
    { id: 11, schoolName: 'Oxford International', studentName: 'Aditya Singh', class: '2nd', totalFee: 15000, paidFee: 0, status: 'Unpaid' },
    { id: 12, schoolName: 'Oxford International', studentName: 'Simran Kaur', class: '1st', totalFee: 14000, paidFee: 14000, status: 'Paid' },
    { id: 13, schoolName: 'Modern Convent', studentName: 'Harsh Yadav', class: '7th', totalFee: 27000, paidFee: 15000, status: 'Partial' },
    { id: 14, schoolName: 'Modern Convent', studentName: 'Ananya Joshi', class: '6th', totalFee: 26000, paidFee: 26000, status: 'Paid' },
    { id: 15, schoolName: 'Delhi Public School', studentName: 'Rohan Malhotra', class: '9th', totalFee: 33000, paidFee: 0, status: 'Unpaid' },
    { id: 16, schoolName: 'Delhi Public School', studentName: 'Tanya Kapoor', class: '8th', totalFee: 31000, paidFee: 20000, status: 'Partial' },
    { id: 17, schoolName: 'Little Flower School', studentName: 'Nikhil Jain', class: '5th', totalFee: 22000, paidFee: 22000, status: 'Paid' },
    { id: 18, schoolName: 'Little Flower School', studentName: 'Shivani Das', class: '4th', totalFee: 19000, paidFee: 0, status: 'Unpaid' },
    { id: 19, schoolName: 'Springfield Academy', studentName: 'Akash Gupta', class: '11th', totalFee: 38000, paidFee: 18000, status: 'Partial' },
    { id: 20, schoolName: 'Springfield Academy', studentName: 'Pooja Mishra', class: '12th', totalFee: 40000, paidFee: 40000, status: 'Paid' },
    { id: 21, schoolName: 'Global International', studentName: 'Vikas Chauhan', class: '10th', totalFee: 36000, paidFee: 10000, status: 'Partial' },
    { id: 22, schoolName: 'Global International', studentName: 'Ritika Sharma', class: '9th', totalFee: 34000, paidFee: 34000, status: 'Paid' }
  ];
  schools: School[] = [
    { id: 1, name: 'Green Valley High School', domain: 'greenvalley.edu', status: 'Active' },
    { id: 2, name: 'Sunrise Public School', domain: 'sunrise.edu', status: 'Inactive' },
    { id: 3, name: 'St. Joseph Academy', domain: 'stjoseph.edu', status: 'Active' },
    { id: 4, name: 'Oxford International', domain: 'oxfordintl.com', status: 'Active' },
    { id: 5, name: 'Riverdale High', domain: 'riverdale.edu', status: 'Inactive' },
    { id: 6, name: 'Springfield School', domain: 'springfield.org', status: 'Active' },
    { id: 7, name: 'Heritage Academy', domain: 'heritage.edu', status: 'Active' },
    { id: 8, name: 'Mount Carmel School', domain: 'mtcarmel.edu', status: 'Inactive' },
    { id: 9, name: 'Silver Oaks School', domain: 'silveroaks.org', status: 'Active' },
    { id: 10, name: 'Global International School', domain: 'globalint.com', status: 'Active' },
    { id: 11, name: 'Bright Future Academy', domain: 'brightfuture.edu', status: 'Inactive' },
    { id: 12, name: 'St. Xavier’s School', domain: 'stxaviers.org', status: 'Active' },
    { id: 13, name: 'Horizon Public School', domain: 'horizon.edu', status: 'Active' },
    { id: 14, name: 'Blue Bells Academy', domain: 'bluebells.edu', status: 'Inactive' },
    { id: 15, name: 'Royal Kids School', domain: 'royalkids.edu', status: 'Active' },
    { id: 16, name: 'Knowledge Tree School', domain: 'knowledgetree.edu', status: 'Active' },
    { id: 17, name: 'Little Flower High', domain: 'littleflower.edu', status: 'Inactive' },
    { id: 18, name: 'New Era Public School', domain: 'newera.org', status: 'Active' },
    { id: 19, name: 'Gyan Deep Academy', domain: 'gyandeep.edu', status: 'Active' },
    { id: 20, name: 'St. Mary’s Convent', domain: 'stmarys.edu', status: 'Inactive' },
    { id: 21, name: 'Dreamland School', domain: 'dreamland.edu', status: 'Active' },
    { id: 22, name: 'National Public School', domain: 'nps.edu', status: 'Active' },
    { id: 23, name: 'Carmel Convent School', domain: 'carmel.edu', status: 'Inactive' },
    { id: 24, name: 'Future Leaders Academy', domain: 'futureleaders.org', status: 'Active' },
    { id: 25, name: 'Victory International', domain: 'victoryint.edu', status: 'Active' },
  ];
   schoolForm: any=FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.schoolForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['Active', Validators.required],
      domain: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
    });
  }

  submitForm() {
    if (this.schoolForm.valid) {
      console.log("✅ School Added:", this.schoolForm.value);
      alert("School Added Successfully!");
      this.closeModal();
    }
  }

  openModal() {
    const modal = document.getElementById('addSchoolModal');
    if (modal) modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('addSchoolModal');
    if (modal) modal.style.display = 'none';
  }

   SchoolSettings(url: any) {
    this.router.navigateByUrl('/super-admin/schools/' + url);
  }
}
