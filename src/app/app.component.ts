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
  bodyInsert = {
    dataSource: "Cluster0",
    database: "Fonoteca",
    collection: "Titulo",
    document: {
      Titulo : "Pabo's Kamasutra",
      Album : "Kamasutras books",
      Autor : "PAbo",
      Compositor : "Pabo",
      Año : "1754",
      Genero : "Pansexual",
      Formato : "Vida Real",
      Ubicacion : "Lagos de moreno"
    }
  };
  headers = new HttpHeaders({
    'Content-Type': 'application/ejson',
    'Accept': 'application/json',
    'apiKey' : 'mg6VdO8ZjsklYe5sUjgea4ZcDfS1IoRwwvn4r7LF0GsqQZW6tpbHxMVoWPhr38Yr'
  });

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

    this.http.post('https://us-east-1.aws.data.mongodb-api.com/app/fonoteca-dahhj/endpoint/data/v1/action/insertOne' , this.bodyInsert, { headers: this.headers }).subscribe(
      response => {
          console.log(response)
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
