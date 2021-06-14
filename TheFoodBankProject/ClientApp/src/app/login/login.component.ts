import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** Login component*/
export class LoginComponent {
    router: any;
    /** Login ctor */
    constructor(private inventoryService:InventoryService) {

  }

  myLogin: string = "";

  getLogin(): void {
    this.myLogin = this.inventoryService.getLogin();
  }


  setLogin(form: NgForm): void {
    this.inventoryService.setLogin(form.form.value.user);
    this.getLogin();
    this.router.navigate(['menu']);
  }




  //talk to justin about login 
}
