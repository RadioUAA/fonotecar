import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Articulo } from '../models/articulo';
import { Int32 } from 'mongodb';

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

  //articulos: Articulo[] = [];
  articulos: any;
  arrayArticulos: any;

  uri: string = "mongodb+srv://BDradio:<password>@cluster0.ts8l218.mongodb.net/?retryWrites=true&w=majority";

  constructor(private http: HttpClient) {
    this.selectedArticulo = new Articulo();
  }

  //Obtiene todos los articulos
  getArticulos() {
    this.articulos = "";
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
          collection: "Titulo"
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/find', bodyInsert, { headers: headers }).subscribe(
          response => {
            this.arrayArticulos = JSON.stringify(response);
            //console.log(this.arrayArticulos);
            this.articulos = JSON.parse(this.arrayArticulos);
            //console.log(this.articulos.documents.length);
            //console.log(this.articulos.documents[0].titulo);
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

  //Actualiza un articulo
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
          filter: { _id: { $oid: articulo._id} },
          update: { 
            $set: {
              titulo: articulo.titulo,
              album: articulo.album,
              autor: articulo.autor,
              compositor: articulo.compositor,
              anio: articulo.anio,
              genero: articulo.genero,
              formato: articulo.formato,
              ubicacion: articulo.ubicacion
            }
          },
          upsert: "false"
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/updateOne', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
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

  //Añade un articulo
  postArticulo(articulo: Articulo) {
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
          document: {
            titulo: articulo.titulo,
            album: articulo.album,
            autor: articulo.autor,
            compositor: articulo.compositor,
            anio: articulo.anio,
            genero: articulo.genero,
            formato: articulo.formato,
            ubicacion: articulo.ubicacion
          }
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/insertOne', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
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

  //Elimina un articulo
  deleteArticulo(id: String) {
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
          filter: { _id: { $oid: id} }
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/deleteOne', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
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

  //Busca articulos por titulo, album, autor, compositor, formato y ubicacion
  busquedaGeneral(consulta: String){
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
          filter: { 
            $or: [
              { titulo: { $regex: consulta, $options: 'i' } },
              { album: { $regex: consulta, $options: 'i' } },
              { autor: { $regex: consulta, $options: 'i' } },
              { compositor: { $regex: consulta, $options: 'i' } },
              { formato: { $regex: consulta, $options: 'i' } },
              { ubicacion: { $regex: consulta, $options: 'i' } }
            ]
          },
          sort: { completedAt: 1 }
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/find', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
            this.arrayArticulos = JSON.stringify(response);
            console.log(this.arrayArticulos);
            this.articulos = JSON.parse(this.arrayArticulos);
            console.log(this.articulos.documents.length);
            //console.log(this.articulos.documents[0].titulo);
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

  //Busca articulos por categoria/genero
  buscarCategoria(consulta: String){
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
          filter: { genero: { $regex: consulta, $options: 'i' } },
          sort: { completedAt: 1 }
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/find', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
            this.arrayArticulos = JSON.stringify(response);
            console.log(this.arrayArticulos);
            this.articulos = JSON.parse(this.arrayArticulos);
            console.log(this.articulos.documents.length);
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

  //Busca articulos por anio
  buscarAnios(consulta: String){
    //El valor del input para buscar por año se transforma a formato numérico para coincidir con el campo en mongoDB
    var anioConsulta: any = Number(consulta);
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
          filter: { anio: anioConsulta },
          sort: { completedAt: 1 }
        };

        this.http.post('https://us-east-2.aws.data.mongodb-api.com/app/data-cvcha/endpoint/data/v1/action/find', bodyInsert, { headers: headers }).subscribe(
          response => {
            console.log(response);
            this.arrayArticulos = JSON.stringify(response);
            console.log(this.arrayArticulos);
            this.articulos = JSON.parse(this.arrayArticulos);
            console.log(this.articulos.documents.length);
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
