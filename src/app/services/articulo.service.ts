import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  readonly URL_API = 'http://localhost:3000/api/items';

  selectedArticulo: Articulo = {
    _id: "",
    name: "",
    album: "",
    autor: "",
    year: ""
  };

  articulos: Articulo[] = [];

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
