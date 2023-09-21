import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public isAuthenticable: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {
    // Realiza una solicitud HTTP al servidor para autenticar al usuario
    const credentials = { username, password };
  
    if(username==="Radio2023" && password==="RUAA2023gallo"){
      this.isAuthenticable = true;
      return true;
      return this.http.post<any>('http://localhost:3000/api/authenticate', credentials);
    }
    else{
      this.isAuthenticable = false;
      return false;
      //Credenciales inválidas'); // Puedes manejar el error aquí

    }
    //return this.http.post<any>('Login', credentials);
  }
  deauthenticate() {
    // Deauthenticate the user.
    // ...

    // Set the `isAuthenticated` property to false.
    
    this.isAuthenticable = false;
  }

}
