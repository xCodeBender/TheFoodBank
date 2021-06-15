import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { InventoryService } from '../inventory.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** Login component*/
export class LoginComponent {
    /** Login ctor */
  constructor(private inventoryService: InventoryService, public router: Router) {

  }

  @Output() createdLogin = new EventEmitter<User>();

  myLogin: string = "";

  getLogin(): void {
    this.myLogin = this.inventoryService.getLogin();
  }


  setLogin(form: NgForm): void {
    this.inventoryService.setLogin(form.form.value.user);
    this.getLogin();
    this.router.navigate(['Menu']);
  }




}
