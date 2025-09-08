export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  schoolId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'paid' | 'unpaid' | 'overdue';
  description: string;
  receiptNumber?: string;
}

export interface PaymentHistory {
  id: string;
  studentId: string;
  amount: number;
  paidDate: Date;
  method: 'cash' | 'card' | 'bank_transfer' | 'online';
  receiptNumber: string;
  description: string;
}