export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  theme?: SchoolTheme;
  totalStudents: number;
  totalFees: number;
  paidFees: number;
  unpaidFees: number;
  createdAt: Date;
}

export interface SchoolTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  logo?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  schoolId: string;
  parentId: string;
  totalFees: number;
  paidFees: number;
  unpaidFees: number;
  lastPayment?: Date;
  status: 'paid' | 'unpaid' | 'partial';
}

export interface Students{
  school_id: number;
  name: string;
  date_of_birth: Date;
  gender: "Male" | "Female" | "Other";
  father_name: string;
  mother_name: string;
  local_guardian_name: string;
  full_address: string;
  primary_mobile_number: string;
  secondary_mobile_number: string;
  whatsapp_number: string;
  email: string;
}