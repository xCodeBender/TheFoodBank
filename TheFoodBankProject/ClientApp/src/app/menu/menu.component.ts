import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory'
import { Ingredient } from '../ingredient';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
/** Menu component*/
export class MenuComponent {
  /** Menu ctor */

  ngOnInit(): void {
    this.searchIngredientByBankId(2);
  }

  inventories: Inventory[] = [];
  ingredients: Ingredient[] = [];
  ingredient: Ingredient;

 /* userCart: Ingredient[] = [];*/

  constructor(private inventoryService: InventoryService, public router: Router ) {}

  getMyInventory(): void {
    this.inventoryService.getInventory().subscribe(inventories => this.inventories = inventories);
  }

  searchIngredientByBankId(bankId: number): any {
    this.inventoryService.getIngredientByBank(bankId).subscribe((b) => {
      this.ingredients = b
      console.log(this.ingredients)
    });
  }

  searchBank(form: NgForm): void {
    let search = form.form.value.search;
    this.searchIngredientByBankId(search);
    this.inventoryService.setBankId(search);


  }

  addToCart(addIngredient: Ingredient) {
   /* let addItem: Ingredient[] = [];*/

    //this.userCart.push(addIngredient);
    this.inventoryService.addToCart(addIngredient);
    //console.log(this.userCart);
  }

  deleteFromCart(deleteIngredient: Ingredient) {
    //let deleteItem = this.userCart.indexOf(deleteIngredient);
   // this.userCart.splice(deleteItem, 1);
   // console.log(this.userCart);
    this.inventoryService.deleteFromCart(deleteIngredient);
  }

  

  
}
