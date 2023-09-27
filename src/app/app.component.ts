import { Component } from '@angular/core';
import { NavbarService } from './services/nav-bar.service';
import { Router } from '@angular/router';
import { AuthserviceService } from './services/authservice.service';
import { ArticuloService } from './services/articulo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radio';
  
  

  constructor(
    public navbarService: NavbarService,
    public authservice: AuthserviceService,
    public router: Router,
    private http: HttpClient,
    public mongo: ArticuloService) {}
  get isNavbarVisible() {
    return this.navbarService.isNavbarVisible;
  
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
