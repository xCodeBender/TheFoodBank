import { Injectable } from '@angular/core';
import { Ingredient} from './ingredient'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory';
import { Bank } from './Bank';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  private inventoryUrl = "https://localhost:44323/api/FoodBank";

  constructor(private http: HttpClient) {

  }

  testApi(): void {
    this.http.get("https://api.spoonacular.com/food/ingredients/search?query=baking mix&apiKey=ff94e67c9adc42c8a88c2308d88ce632&number=1").subscribe((response: any) => { console.log(response)});
  }

  //autocomplete api call for ingredient
  searchIngredientByName(foodName: string): any {
    return this.http.get(`https://api.spoonacular.com/food/ingredients/search?query=${foodName} &apiKey=ff94e67c9adc42c8a88c2308d88ce632&=`).subscribe((response: any) => { console.log(response) });
  }



  // login to the page
  loginName: string = "Default";

  setLogin(newlogin: string): void {
    this.loginName = newlogin;
  }

  getLogin(): string {
    return this.loginName;
  }

  //adding new ingredient to ingredient list
  addNewIngredient(newIngredient: Ingredient): any {
    console.log(newIngredient);
    const params = new HttpParams();

    return this.http.post(this.inventoryUrl + "/AddFood" + "?foodName=" + newIngredient.foodName + "&apiId=" + newIngredient.apiId + "&foodImages=" + newIngredient.foodImages, params);
  }

  //return all ingredients
  getIngredients(): any {
    return this.http.get(this.inventoryUrl + "/AllIngredients");
  }

  //return inventory
  getInventory(): any {
    return this.http.get(this.inventoryUrl + "/GetInventory");
  }
  //add to inventory
  addNewInventory(newInventory: Inventory): any {
    console.log(newInventory);
    const params = new HttpParams();

    return this.http.post(this.inventoryUrl + "/AddToInventory" + "?bankId=" + newInventory.BankId + "&ingredientId=" + newInventory.IngredientsId + "&quantity=" + newInventory.Quantity, params);
  }

  getIngredientByBank(bankId: number): any {
    return this.http.get(this.inventoryUrl + "/GetIngredientsByBankId" + "?bankId=" + bankId);
  }



  //searchFoodName(foodName: string): any {
    //return this.http.get(this.inventoryUrl + "/ingredientName" + )
 // }
}
