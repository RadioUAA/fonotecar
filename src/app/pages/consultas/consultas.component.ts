import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
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

  bgeneral: String = "";
  bcategory: String = "";
  byear: String = "";

  constructor (public router: Router, public articuloService: ArticuloService){
    this.inputArticulo = new Articulo();
  }

  ngOnInit(){  
    this.getArticulos();
  }

  //Muestra TODOS los articulos en la tabla
  getArticulos(){
    this.articuloService.getArticulos();
  }

  viewArticulo(articulo: Articulo){
    this.inputArticulo = articulo;
    //PARTE DONDE SE PUEDE METER EL MODAL PARA MOSTRAR EL ARTICULO SELECCIONADO
    /************************************************************************/
    confirm(
      ">>>>> Artículo seleccionado <<<<<\n"
      +"Título: "+articulo.titulo+"\n"
      +"Álbum: "+articulo.album+"\n"
      +"Autor: "+articulo.autor+"\n"
      +"Compositor: "+articulo.compositor+"\n"
      +"Año: "+articulo.anio+"\n"
      +"Género: "+articulo.genero+"\n"
      +"Formato: "+articulo.formato+"\n"
      +"Ubicación: "+articulo.ubicacion+"\n"
      );
  }

  searchGeneral(){
    this.articuloService.busquedaGeneral(this.bgeneral);
    this.bcategory = "";
    this.byear = ""; 
  }

  searchCategory(){
    this.articuloService.buscarCategoria(this.bcategory);
    this.bgeneral = "";
    this.byear = "";
  }

  searchYear(){
    this.articuloService.buscarAnios(this.byear);
    this.bgeneral = "";
    this.bcategory = "";
  }

  reset(){
    this.bgeneral = "";
    this.bcategory = "";
    this.byear = "";
    this.articuloService.getArticulos();
  }

}
