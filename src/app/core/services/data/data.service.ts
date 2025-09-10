import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { FeeRecord } from '../../models/fee.model';
import { School, Student } from '../../models/school.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mock data
  private mockSchools: School[] = [
    {
      id: '1',
      name: 'Greenwood High School',
      address: '123 Education St, City',
      phone: '+1-555-0101',
      email: 'info@greenwood.edu',
      totalStudents: 450,
      totalFees: 225000,
      paidFees: 180000,
      unpaidFees: 45000,
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#6b7280'
      },
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Riverside Academy',
      address: '456 Learning Ave, City',
      phone: '+1-555-0102',
      email: 'contact@riverside.edu',
      totalStudents: 320,
      totalFees: 160000,
      paidFees: 144000,
      unpaidFees: 16000,
      theme: {
        primaryColor: '#dc2626',
        secondaryColor: '#6b7280'
      },
      createdAt: new Date('2023-02-20')
    },
    {
      id: '3',
      name: 'Sunshine Elementary',
      address: '789 Knowledge Blvd, City',
      phone: '+1-555-0103',
      email: 'hello@sunshine.edu',
      totalStudents: 280,
      totalFees: 140000,
      paidFees: 126000,
      unpaidFees: 14000,
      theme: {
        primaryColor: '#f59e0b',
        secondaryColor: '#6b7280'
      },
      createdAt: new Date('2023-03-10')
    }
  ];

  private mockStudents: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.parent@email.com',
      phone: '+1-555-0201',
      class: 'Grade 10A',
      schoolId: '1',
      parentId: '3',
      totalFees: 500,
      paidFees: 500,
      unpaidFees: 0,
      lastPayment: new Date('2024-01-15'),
      status: 'paid'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.parent@email.com',
      phone: '+1-555-0202',
      class: 'Grade 9B',
      schoolId: '1',
      parentId: '4',
      totalFees: 500,
      paidFees: 300,
      unpaidFees: 200,
      lastPayment: new Date('2023-12-20'),
      status: 'partial'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.parent@email.com',
      phone: '+1-555-0203',
      class: 'Grade 11A',
      schoolId: '1',
      parentId: '5',
      totalFees: 500,
      paidFees: 0,
      unpaidFees: 500,
      status: 'unpaid'
    }
  ];

  private mockFeeRecords: FeeRecord[] = [
    {
      id: '1',
      studentId: '1',
      studentName: 'Alice Johnson',
      schoolId: '1',
      amount: 500,
      dueDate: new Date('2024-01-31'),
      paidDate: new Date('2024-01-15'),
      status: 'paid',
      description: 'Tuition Fee - January 2024',
      receiptNumber: 'REC001'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Bob Smith',
      schoolId: '1',
      amount: 200,
      dueDate: new Date('2024-02-28'),
      status: 'unpaid',
      description: 'Remaining Tuition Fee - February 2024'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carol Davis',
      schoolId: '1',
      amount: 500,
      dueDate: new Date('2023-12-31'),
      status: 'overdue',
      description: 'Tuition Fee - December 2023'
    }
  ];

  constructor(private http:HttpClient) {}

  // Schools
  getSchools(): Observable<School[]> {
    return of(this.mockSchools).pipe(delay(800));
  }

  getSchoolById(id: string): Observable<School | undefined> {
    return of(this.mockSchools.find(s => s.id === id)).pipe(delay(500));
  }

  updateSchoolTheme(schoolId: string, theme: any): Observable<boolean> {
    return of(null).pipe(
      delay(1000),
      () => {
        const school = this.mockSchools.find(s => s.id === schoolId);
        if (school) {
          school.theme = theme;
          return of(true);
        }
        return of(false);
      }
    );
  }

  // Students
  getStudentsBySchool(schoolId: string): Observable<Student[]> {
    return of(this.mockStudents.filter(s => s.schoolId === schoolId)).pipe(delay(600));
  }

  getStudentsByParent(parentId: string): Observable<Student[]> {
    return of(this.mockStudents.filter(s => s.parentId === parentId)).pipe(delay(600));
  }

  // Fee Records
  getFeeRecordsBySchool(schoolId: string): Observable<FeeRecord[]> {
    return of(this.mockFeeRecords.filter(f => f.schoolId === schoolId)).pipe(delay(700));
  }

  getFeeRecordsByStudent(studentId: string): Observable<FeeRecord[]> {
    return of(this.mockFeeRecords.filter(f => f.studentId === studentId)).pipe(delay(700));
  }

  // Dashboard Statistics
  getDashboardStats(userRole: string, schoolId?: string): Observable<any> {
    let stats;
    
    if (userRole === 'super_admin') {
      stats = {
        totalSchools: this.mockSchools.length,
        totalStudents: this.mockSchools.reduce((sum, school) => sum + school.totalStudents, 0),
        totalFeesCollected: this.mockSchools.reduce((sum, school) => sum + school.paidFees, 0),
        totalFeesOutstanding: this.mockSchools.reduce((sum, school) => sum + school.unpaidFees, 0),
        recentPayments: 156,
        monthlyGrowth: 8.2
      };
    } else if (userRole === 'school_admin' && schoolId) {
      const school = this.mockSchools.find(s => s.id === schoolId);
      const students = this.mockStudents.filter(s => s.schoolId === schoolId);
      stats = {
        totalStudents: school?.totalStudents || 0,
        paidStudents: students.filter(s => s.status === 'paid').length,
        unpaidStudents: students.filter(s => s.status === 'unpaid').length,
        partialStudents: students.filter(s => s.status === 'partial').length,
        totalFeesCollected: school?.paidFees || 0,
        totalFeesOutstanding: school?.unpaidFees || 0,
        collectionRate: school ? ((school.paidFees / school.totalFees) * 100) : 0
      };
    } else if (userRole === 'parent') {
      const parentStudents = this.mockStudents.filter(s => s.parentId === '3'); // Current parent mock
      stats = {
        totalChildren: parentStudents.length,
        totalFeesPaid: parentStudents.reduce((sum, s) => sum + s.paidFees, 0),
        totalFeesOutstanding: parentStudents.reduce((sum, s) => sum + s.unpaidFees, 0),
        upcomingPayments: 2,
        overduePayments: 0
      };
    }

    return of(stats).pipe(delay(800));
  }

  // Chart data
  getChartData(type: string, schoolId?: string): Observable<any> {
    let chartData;

    if (type === 'monthly_collection') {
      chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Fees Collected',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          backgroundColor: 'rgba(79, 70, 229, 0.8)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 2
        }]
      };
    } else if (type === 'payment_status') {
      chartData = {
        labels: ['Paid', 'Unpaid', 'Partial'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(251, 191, 36, 0.8)'
          ],
          borderWidth: 0
        }]
      };
    }

    return of(chartData).pipe(delay(600));
  }

  GetAllSates() {
    return this.http.get('https://restindia.herokuapp.com/state/all')
  }
  GetAllCities(state:any) {
    return this.http.get(`https://restindia.herokuapp.com/cities?state=${state}`)
  }
}
