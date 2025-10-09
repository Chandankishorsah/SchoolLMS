import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SchoolService } from '../../../../core/services/school/school.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AdminService } from '../../../../core/services/Admin/admin.service';
import { tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

// ✅ Bootstrap Modal ke liye import
declare var bootstrap: any;

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './fee-structure.component.html',
  styleUrl: './fee-structure.component.scss'
})
export class FeeStructureComponent {
  feeForm!: FormGroup;
  feeList: any[] = [];
  isEditMode = false;
  selectedId: number | null = null;
  loading = false;
  modalInstance: any; // ✅ modal reference
  classes: any=[];
  academicYears: any=[];

  constructor(private fb: FormBuilder, private schoolService: SchoolService,private adminService:AdminService,private router:Router) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFeeStructures();
    this.GetAllClasses();
    this.GetAllAcademicYears();
  }

  initForm() {
    this.feeForm = this.fb.group({
      class_id: [null, Validators.required],
      academic_year_id: [null, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      is_active: [true]
    });
  }

  // ✅ Modal open helper
  openModal(id: string) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  // ✅ Modal close helper
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  loadFeeStructures() {
    this.loading = true;
    this.schoolService.GetAllFeeStructures().subscribe({
      next: (res: any) => {
        this.feeList = res.data || res;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  addNew() {
    this.isEditMode = false;
    this.selectedId = null;
    this.feeForm.reset({ is_active: true });
    this.openModal('feeModal');
  }

  editFee(fee: any) {
    this.isEditMode = true;
    this.selectedId = fee.id;
    this.feeForm.patchValue(fee);
    this.openModal('feeModal');
  }

  saveFee() {
    if (this.feeForm.invalid) return;
    const payload = this.feeForm.value;

    if (this.isEditMode && this.selectedId) {
      this.schoolService.UpdateFeeStructure(this.selectedId, payload).subscribe(() => {
        Swal.fire('Updated!', 'Fee structure updated successfully', 'success');
        this.closeModal();
        this.loadFeeStructures();
      });
    } else {
      this.schoolService.CreateFeeStructure(payload).subscribe(() => {
        Swal.fire('Added!', 'Fee structure added successfully', 'success');
        this.closeModal();
        this.loadFeeStructures();
      });
    }
  }

  deleteFee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the fee structure!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.schoolService.DeleteFeeStructure(id).subscribe(() => {
          Swal.fire('Deleted!', 'Fee structure deleted.', 'success');
          this.loadFeeStructures();
        });
      }
    });
  }

  GetAllClasses() {
      this.adminService
        .GetAllClasses()
        .pipe(
          tap(() => console.log('API call started')),
          map((res: any) => res.data || res),
          catchError((err) => {
            console.error('Error fetching classes:', err);
            return of([]);
          })
        )
        .subscribe({
          next: (classes) => {
            console.log('Classes fetched:', classes);
            this.classes = classes;
          },
          complete: () => console.log('API call completed'),
        });
    }
  
    GetAllAcademicYears() {
      this.adminService.GetAllAcademicYear().subscribe((res: any) => {
        console.log(res, 'academic year data');
        if (res.status == 'error') {
          this.router.navigate(['/auth/login']);
          localStorage.clear();
        }
        this.academicYears = res.data.data;
      });
    }
}
