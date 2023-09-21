import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { AuthGuard } from './auth.guard';
import { AuthserviceService } from './services/authservice.service';
import { BdCrudComponent } from './pages/bd-crud/bd-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ConsultasComponent,
    BdCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
