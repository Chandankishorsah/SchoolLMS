import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
interface Student {
  id: number;
  name: string;
  grade: string;
  parent: string;
  feesStatus: 'Paid' | 'Unpaid' | 'Partial';
}
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
students: Student[] = [
    { id: 1, name: 'Rahul Sharma', grade: '5th', parent: 'Amit Sharma', feesStatus: 'Paid' },
    { id: 2, name: 'Priya Singh', grade: '6th', parent: 'Sunil Singh', feesStatus: 'Partial' },
    { id: 3, name: 'Aman Verma', grade: '8th', parent: 'Rakesh Verma', feesStatus: 'Unpaid' },
    { id: 4, name: 'Sneha Gupta', grade: '7th', parent: 'Anil Gupta', feesStatus: 'Paid' },
    { id: 5, name: 'Arjun Mehta', grade: '9th', parent: 'Vivek Mehta', feesStatus: 'Partial' },
    { id: 6, name: 'Neha Reddy', grade: '10th', parent: 'Ravi Reddy', feesStatus: 'Unpaid' },
    { id: 7, name: 'Karan Patel', grade: '4th', parent: 'Mahesh Patel', feesStatus: 'Paid' },
    { id: 8, name: 'Ishita Roy', grade: '3rd', parent: 'Sandeep Roy', feesStatus: 'Partial' },
    { id: 9, name: 'Ravi Kumar', grade: '11th', parent: 'Arun Kumar', feesStatus: 'Partial' },
    { id: 10, name: 'Meera Nair', grade: '12th', parent: 'Suresh Nair', feesStatus: 'Paid' },
    { id: 11, name: 'Aditya Singh', grade: '2nd', parent: 'Rajesh Singh', feesStatus: 'Unpaid' },
    { id: 12, name: 'Simran Kaur', grade: '1st', parent: 'Harpreet Kaur', feesStatus: 'Paid' },
    { id: 13, name: 'Harsh Yadav', grade: '7th', parent: 'Deepak Yadav', feesStatus: 'Partial' },
    { id: 14, name: 'Ananya Joshi', grade: '6th', parent: 'Prakash Joshi', feesStatus: 'Paid' },
    { id: 15, name: 'Rohan Malhotra', grade: '9th', parent: 'Sanjay Malhotra', feesStatus: 'Unpaid' },
    { id: 16, name: 'Tanya Kapoor', grade: '8th', parent: 'Manoj Kapoor', feesStatus: 'Partial' },
    { id: 17, name: 'Nikhil Jain', grade: '5th', parent: 'Ashok Jain', feesStatus: 'Paid' },
    { id: 18, name: 'Shivani Das', grade: '4th', parent: 'Sanjay Das', feesStatus: 'Unpaid' },
    { id: 19, name: 'Akash Gupta', grade: '11th', parent: 'Vikas Gupta', feesStatus: 'Partial' },
    { id: 20, name: 'Pooja Mishra', grade: '12th', parent: 'Anand Mishra', feesStatus: 'Paid' },
    { id: 21, name: 'Vikas Chauhan', grade: '10th', parent: 'Raj Chauhan', feesStatus: 'Partial' },
    { id: 22, name: 'Ritika Sharma', grade: '9th', parent: 'Mukesh Sharma', feesStatus: 'Paid' },
    { id: 23, name: 'Siddharth Rao', grade: '8th', parent: 'Ramesh Rao', feesStatus: 'Unpaid' },
    { id: 24, name: 'Kavya Menon', grade: '7th', parent: 'Sajith Menon', feesStatus: 'Partial' },
    { id: 25, name: 'Yash Thakur', grade: '6th', parent: 'Vinod Thakur', feesStatus: 'Paid' }
  ];
}
