import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  readonly URL_API = 'http://localhost:3000/api/items';

  selectedArticulo: Articulo = {
    _id: "",
    titulo: "",
    album: "",
    autor: "",
    compositor: "",
    anio: "",
    genero: "",
    formato: "",
    ubicacion: ""
  };


  bodyToken = {
    "username": "radioUAA2023@outlook.com",
    "password": "Radio2023UAAmongo"
  };
  
  headersT = new HttpHeaders()
  .set('Content-Type', 'application/json');

  articulos: Articulo[] = [];

  uri : string = "mongodb+srv://BDradio:<password>@cluster0.ts8l218.mongodb.net/?retryWrites=true&w=majority";

  constructor(private http: HttpClient) {
    this.selectedArticulo = new Articulo ();
  }

  getArticulos() {
    return this.http.get(this.URL_API);
  }

  postArticulo(articulo: Articulo) {
    return this.http.post(this.URL_API, articulo);
  }

  putArticulo(articulo: Articulo) { 
    this.http.post("https://us-east-2.aws.realm.mongodb.com/api/client/v2.0/app/data-cvcha/auth/providers/local-userpass/login", this.bodyToken, { headers: this.headersT }).subscribe(
      (response: any) => {
        // Maneja la respuesta aquí
        var headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Request-Headers', '*')
        .set('Authorization', 'Bearer ' + response.access_token);

        var bodyInsert = {
          dataSource: "Cluster0",
          database: "Fonoteca",
          collection: "Titulo",
          document: articulo
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/insertOne' , bodyInsert, { headers: headers }).subscribe(
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

  deleteArticulo(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
