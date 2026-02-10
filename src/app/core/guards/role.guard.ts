import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const expectedRoles = route.data?.['roles'] as string[];
  const userRoles = authService.getAuthorities();

  if (!expectedRoles || expectedRoles.length === 0) return true;

  const hasRole = expectedRoles.some(r => userRoles.includes(r));
  
  return hasRole ? true : router.createUrlTree(['/dashboard']);
};
