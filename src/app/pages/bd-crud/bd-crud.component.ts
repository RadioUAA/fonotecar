import { Component } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { NgForm } from '@angular/forms';
import { Articulo } from 'src/app/models/articulo';

@Component({
  selector: 'app-bd-crud',
  templateUrl: './bd-crud.component.html',
  styleUrls: ['./bd-crud.component.css'],
  providers: [ArticuloService]
})
export class BdCrudComponent {
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

  constructor (private authservice: AuthserviceService, public router: Router, public articuloService: ArticuloService){
    this.inputArticulo = new Articulo();
  }
  ngOnInit(){
    if (!this.authservice.isAuthenticable){
      this.router.navigate(['/Login']);
    }    
    this.getArticulos();
  }

  addArticulo(form: NgForm){
    if(form.value._id){
      if(confirm('Are you sure you want to edit it?')){
        this.articuloService.putArticulo(form.value);
        console.log("Actualizado exitosamente!");
        this.resetForm(form);
        form.reset();
      }
    } else {
      if(form.value.titulo != "" 
        && form.value.album != ""
        && form.value.autor != ""
        && form.value.compositor != ""
        && form.value.anio != ""
        && form.value.genero != ""
        && form.value.formato != ""
        && form.value.ubicacion != ""
        ){
        this.articuloService.postArticulo(form.value);
        console.log("Ingreso exitoso!");
        this.resetForm(form);
        //Añadir un toast para informar que se ingresó un articulo
      }
      
    }
  }

  getArticulos(){
    this.articuloService.getArticulos();
    //.subscribe(res => {
      //this.articuloService.articulos = res as Articulo[];
      //console.log(res);
    //});
  }

  editArticulo(articulo: Articulo){
    //this.articuloService.selectedArticulo = articulo;
    this.inputArticulo = articulo;
  }

  deleteArticulo(_id: String){
    if(confirm('Are you sure you want to delete it?')){
      this.articuloService.deleteArticulo(_id);
      /*
      .subscribe(res => {
        console.log(res);
        this.getArticulos();
        //Poner toast de articulo eliminado...
      });
      */
    }
  }

  resetForm(form?: NgForm){
    if(form){
      //form.reset();
      //this.articuloService.selectedArticulo = new Articulo();
      this.inputArticulo = new Articulo();
    }
  }
}
