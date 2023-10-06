import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from 'src/app/models/articulo';
import Swal from 'sweetalert2';

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
  p: any;
  bgeneral: String = "";
  bcategory: String = "";
  byear: String = "";
  a:number = 5;


  constructor (public router: Router, public articuloService: ArticuloService){
    this.inputArticulo = new Articulo();
    
  }

  actualizarValor(valor: number) {
    this.a = valor;
  }

  ngOnInit(){  
    this.getArticulos();
    const boton1 = document.getElementById("boton1") as HTMLButtonElement;
    const boton2 = document.getElementById("boton2") as HTMLButtonElement;
    const boton3 = document.getElementById("boton3") as HTMLButtonElement;

    // Agregar manejadores de clic a los botones
    boton1.addEventListener("click", () => {
      this.actualizarValor(5);
    });

    boton2.addEventListener("click", () => {
      this.actualizarValor(10);
    });

    boton3.addEventListener("click", () => {
      this.actualizarValor(15);
    });
  }

  //Muestra TODOS los articulos en la tabla
  getArticulos(){
    this.articuloService.getArticulos();
  }

  viewArticulo(articulo: Articulo){
    this.inputArticulo = articulo;
    //PARTE DONDE SE PUEDE METER EL MODAL PARA MOSTRAR EL ARTICULO SELECCIONADO
    /************************************************************************/
    Swal.fire({
      icon: 'info',
      title: articulo.titulo + " | " + articulo.autor,
      html: "Album: " + articulo.album + ", " + articulo.anio + "<br>" + "Género: "+ articulo.genero + "<br>" + "Compositor: "+ articulo.compositor,
      confirmButtonText: "Aceptar",
      footer: "Ubicaion: " + articulo.ubicacion + ", Formato:" + articulo.formato
    });
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
