import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { NgForm } from '@angular/forms';
import { Articulo } from 'src/app/models/articulo';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  providers: [ArticuloService]
})
export class ConsultasComponent {
  inputArticulo: Articulo = {
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

  constructor (public router: Router, public articuloService: ArticuloService){
    this.inputArticulo = new Articulo();
  }

  ngOnInit(){  
    this.getArticulos();
  }

  getArticulos(){
    this.articuloService.getArticulos()
    .subscribe(res => {
      this.articuloService.articulos = res as Articulo[];
      console.log(res);
    });
  }

  viewArticulo(articulo: Articulo){
    this.inputArticulo = articulo;
  }

  resetForm(form?: NgForm){
    if(form){
      //form.reset();
      this.inputArticulo = new Articulo();
    }
  }

}
