import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  isNavbarVisible = true;

  hideNavbar() {
    this.isNavbarVisible = true;
  }

  showNavbar() {
    this.isNavbarVisible = true;
  }
}
