import { Component, Injectable } from '@angular/core';
import { NavbarService } from '../../services/nav-bar.service';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
declare var $: any; // Declarar jQuery para uso
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  correo: string="";
  clave: string="";
  clave2: string="";
  correo2: string="";

  constructor(
    private navbarService: NavbarService,
    public router: Router,
    private authservice: AuthserviceService,
  ){
    this.clave="RUAA2023gallo"
    this.correo="Radio2023"
    
  }
  ngOnInit(){
    this.navbarService.hideNavbar();

    
  }

  onKeyEmail(event: any){
    this.correo2 = event.target.value;
  }

  onKeyPsw(event: any){
    this.clave2 = event.target.value;
  }
    
  login() {
    console.log(this.correo2);
    console.log(this.clave2);
    this.authservice.authenticate(this.correo2, this.clave2);
    if (localStorage.getItem('seguridad')) {
      // El usuario ya está autenticado, redirige a la página deseada
      this.router.navigate(['/BaseDatos']);
    } else if (this.clave2 == this.clave && this.correo2 == this.correo) {
      // The password is correct. Redirect the user to the desired route.
      localStorage.setItem('seguridad1', this.correo2);
      localStorage.setItem('seguridad2', this.clave2);
      this.router.navigate(['/BaseDatos']);
    } else {
      this.router.navigate(['/Login']);
      $('.toast').toast('show');
        this.authservice.isAuthenticable = false;

          // The password is incorrect. Show an error message to the user.
  }
 }
 logout() {
  // Elimina los elementos relacionados con la autenticación en el almacenamiento local
  localStorage.removeItem('seguridad1');
  localStorage.removeItem('seguridad2');
  this.authservice.isAuthenticable = false;
  // Redirige al usuario a la página de inicio de sesión o a donde desees
  this.router.navigate(['/Login']);
}
}
