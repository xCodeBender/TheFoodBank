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
    /*this.inventoryService.setBankId(2);*/
    this.searchIngredientByBankId(this.bankId);
    this.getMyInventory();
    
  }

  inventories: Inventory[] = [];
  ingredients: Ingredient[] = [];
  bankId: number = 2;

 /* userCart: Ingredient[] = [];*/

  constructor(private inventoryService: InventoryService, public router: Router ) {}

  getMyInventory(): void {
    this.inventoryService.getInventory().subscribe(inventories => {
      this.inventories = inventories;
      console.log(this.inventories);
    });
  }

  searchIngredientByBankId(bankId: number): any {
    this.bankId = bankId;
    this.inventoryService.getIngredientByBank(bankId).subscribe((b) => {
      this.ingredients = b
      console.log(this.ingredients)
      this.inventoryService.setBankId(bankId);
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
    let count = this.getIngredientQuantity(addIngredient);
    if (count > 0) {
      this.inventoryService.addToCart(addIngredient);
      this.lowerQuantity(addIngredient);
    }

  }

  deleteFromCart(deleteIngredient: Ingredient) {
    //let deleteItem = this.userCart.indexOf(deleteIngredient);
    // this.userCart.splice(deleteItem, 1);
    if (this.getCount(deleteIngredient) > 0) {
      this.inventoryService.deleteFromCart(deleteIngredient);
      /*this.inventoryService.getCart().filter(i => i.id == deleteIngredient.id );*/
      this.raiseQuantity(deleteIngredient);
    }
   
  }

  getCount(i: Ingredient): number {
    let result = this.inventoryService.getCart().filter((item) => {
      return item.id == i.id
    });
    console.log(result);
    console.log(i.id);
    return result.length;
  }

  getIngredientQuantity(ingredient: Ingredient): number  {
    console.log(this.inventories);
    console.log(ingredient);
    console.log(this.bankId);
    let find: Inventory = this.inventories.filter(i => i.bankId == this.bankId && i.ingredientsId == ingredient.id)[0];
    console.log(find);
    return find.quantity;
  }

  lowerQuantity(ingredient: Ingredient): void {
    console.log(this.inventories);
    this.inventories.filter(i => i.bankId == this.bankId && i.ingredientsId == ingredient.id)[0].quantity -= 1;
  }

  raiseQuantity(ingredient: Ingredient): void {
    this.inventories.filter(i => i.bankId == this.bankId && i.ingredientsId == ingredient.id)[0].quantity += 1;
  }


}
