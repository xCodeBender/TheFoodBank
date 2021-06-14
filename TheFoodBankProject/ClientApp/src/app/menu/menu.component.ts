import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory'
import { Ingredient } from '../ingredient';
import { Bank} from '../Bank'

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
/** Menu component*/
export class MenuComponent {
  /** Menu ctor */

  ingredient: Ingredient;
  ingredients: Ingredient[] = [];
  inventories: Inventory[] = [];
    constructor(private inventoryService:InventoryService) {}

  getMyInventory(): void {
    this.inventoryService.getInventory().subscribe(inventories => this.inventories = inventories)
  }


  searchIngredients(foodName: string): any {
    this.inventoryService.searchIngredientByName(foodName).subscribe((ingredient) => {
      this.ingredient = ingredient;
      console.log(this.ingredient);
    });
  }


  searchIngredientByBankId(bankId: number): any {
    this.inventoryService.getIngredientByBank(bankId).subscribe((b) => {
      this.ingredients = b
      console.log(this.ingredients)
    });
  }

}
