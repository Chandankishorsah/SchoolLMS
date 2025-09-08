export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'school-admin' | 'parent';
  schoolId?: string;
  schoolName?: string;
  avatar?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'super-admin' | 'school-admin' | 'parent';
  schoolId?: string;
}