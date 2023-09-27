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

  bodyToken = {
    "username": "radioUAA2023@outlook.com",
    "password": "Radio2023UAAmongo"
  };
  
  headersT = new HttpHeaders()
  .set('Content-Type', 'application/json');
  

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

    this.http.post("https://us-east-2.aws.realm.mongodb.com/api/client/v2.0/app/data-cvcha/auth/providers/local-userpass/login", this.bodyToken, { headers: this.headersT }).subscribe(
      (response: any) => {
        // Maneja la respuesta aquí
        var headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Request-Headers', '*')
        .set('Authorization', 'Bearer ' + response.access_token);
        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/insertOne' , this.bodyInsert, { headers: headers }).subscribe(
        response => {
            console.log(response)
        },
        error => {
          console.error('Error:', error);
        }
      );
        console.log(response);
      },
      (error) => {
        // Maneja los errores aquí
        console.error(error);
      }
    );

    
  }
}
