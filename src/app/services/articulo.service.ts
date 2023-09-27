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

  headers = new HttpHeaders({
    'Content-Type': 'application/ejson',
    'Accept': 'application/json',
    'apiKey' : 'mg6VdO8ZjsklYe5sUjgea4ZcDfS1IoRwwvn4r7LF0GsqQZW6tpbHxMVoWPhr38Yr'
  });

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
    return this.http.put(this.URL_API + `/${articulo._id}`, articulo);
  }

  deleteArticulo(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
