// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
    
  }

  canActivate(): boolean {
    // Aquí verificas si el usuario está autenticado, por ejemplo, utilizando localStorage
    const authToken = localStorage.getItem('seguridad');
    if (localStorage.getItem('seguridad1') && localStorage.getItem('seguridad2')) {
      return true; // El usuario está autenticado, permite el acceso a la ruta
    } else {
      this.router.navigate(['/Login']); // Redirige al usuario al inicio de sesión si no está autenticado
      return false;
    }
  }
}
