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

  constructor (private authservice: AuthserviceService, public router: Router, public articuloService: ArticuloService){
    
  }
  ngOnInit(){
    if (!this.authservice.isAuthenticable){
      this.router.navigate(['/Login']);
    }    
    this.getArticulos();
  }

  addArticulo(form: NgForm){
    if(form.value._id){
      this.articuloService.putArticulo(form.value)
      .subscribe(res => {
        console.log(res + "Actualizado exitosamente!");
        this.resetForm(form);
        this.getArticulos();
      });
    } else {
      this.articuloService.postArticulo(form.value)
      .subscribe(res => {
      console.log(res);
      this.resetForm(form);
      this.getArticulos();
      //Añadir un toast para informar que se ingresó un articulo
    });
    }
  }

  getArticulos(){
    this.articuloService.getArticulos()
    .subscribe(res => {
      this.articuloService.articulos = res as Articulo[];
      console.log(res);
    });
  }

  editArticulo(articulo: Articulo){
    this.articuloService.selectedArticulo = articulo;
  }

  deleteArticulo(_id: String){
    if(confirm('Are you sure you want to delete it?')){
      this.articuloService.deleteArticulo(_id)
      .subscribe(res => {
        console.log(res);
        this.getArticulos();
        //Poner toast de articulo eliminado...
      });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.articuloService.selectedArticulo = new Articulo();
    }
  }
}
