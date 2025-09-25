import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard Check:', authService.isAuthenticated);

  if (!authService.isAuthenticated) {
    // Agar login nahi hai to login page bhejo
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // ✅ Role vs Subdomain match karna
  const role = authService.userRole;   // e.g. "super-admin" / "school-admin" / "parent"
  const hostname = window.location.hostname;

  if (role === 'super-admin' && hostname.startsWith('superadmin')) {
    return true;
  }
  if (role === 'school-admin' && hostname.startsWith('schooladmin')) {
    return true;
  }
  if (role === 'parent' && hostname.startsWith('parent')) {
    return true;
  }

  // ❌ Agar mismatch hai to unauthorized redirect
  router.navigate(['/auth/login']);
  return false;
};
