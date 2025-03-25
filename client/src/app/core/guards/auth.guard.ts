import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router); // Correctement injecté

  // Récupérer les informations stockées en session
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  // Vérifier si l'utilisateur est connecté
  if (!token || !userRole) {
    console.log("Accès refusé : pas connecté !");
    router.navigate(['/login']);
    return false;
  }

  // Vérifier le rôle requis
  const requiredRole = route.data['role'];
  if (requiredRole && requiredRole !== userRole) {
    console.log(`Accès refusé : rôle requis '${requiredRole}', mais l'utilisateur a '${userRole}'`);
    router.navigate(['/login']);
    return false;
  }

  console.log("Accès autorisé !");
  return true;
};
