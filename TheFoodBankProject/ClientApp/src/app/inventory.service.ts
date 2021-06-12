import { Injectable } from '@angular/core';
import { Ingredient} from './ingredient'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {

  private inventoryUrl = "https://localhost:44323/api/FoodBank";

  constructor(private http: HttpClient) {

  }

  testApi(): void {
    this.http.get("https://api.spoonacular.com/food/ingredients/search?query=baking mix&apiKey=ff94e67c9adc42c8a88c2308d88ce632&number=1").subscribe((response: any) => { console.log(response)});
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
}
