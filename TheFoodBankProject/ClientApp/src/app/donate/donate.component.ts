import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Ingredient } from '../ingredient'
import { NgForm } from '@angular/forms';
import { Inventory } from '../inventory';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.scss']
})
/** Donate component*/
export class DonateComponent {
  ingredients: Ingredient[] = [];
  ingredient: Ingredient;
  inventory: Inventory[] = [];
    /** Donate ctor */
  constructor(private inventoryService: InventoryService) { }


  ngOnInit(): void {
    this.getMyIngredients();
  }


  getMyIngredients(): void {
    this.inventoryService.getIngredients().subscribe(ingredients => this.ingredients = ingredients)
  }

  addIngredient(form: NgForm): void {
    let response = this.searchIngredients(form.form.value.searchTerm);
    let newIngredient: Ingredient = {
      foodName: form.form.value.foodName,
      apiId:response.results[0].id, //this needs to come from the foodAPI
      foodImages: response.results[0].image,//this needs to come from the foodAPI
      id:0
    }

    this.inventoryService.addNewIngredient(newIngredient);
  }

  addInventory(form: NgForm): void {
    
    let newInventory: Inventory = {
      BankId: 0,//we want this to be current bankID from page
      IngredientsId: 0,//how to add items to inventory when using the api for igredients and also inventory only uses numeric values to store
      Quantity: form.form.value.quantity,
      id: 0
    }
    this.inventoryService.addNewInventory(newInventory);
  }


  searchIngredients(foodName: string): any {
    this.inventoryService.searchIngredientByName(foodName).subscribe(ingredient => this.ingredient = ingredient)
  }


}
