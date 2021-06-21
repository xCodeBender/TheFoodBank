import { Inject, Injectable } from '@angular/core';
import { Ingredient} from './ingredient'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory';
import { Bank } from './Bank';
import { User } from 'oidc-client';

@Injectable({ providedIn: 'root' })
export class InventoryService {

 /* private inventoryUrl = "https://localhost:44323/api/FoodBank/";*/

  constructor(private http: HttpClient, @Inject('BASE_URL') private inventoryUrl: string) {

  }

/*  @Inject('BASE_URL') private inventoryUrl: string)
 "thefoodbank.database.windows.net" */
  userCart: Ingredient[] = [];

  testApi(): void {
    this.http.get("https://api.spoonacular.com/food/ingredients/search?query=baking mix&apiKey=ff94e67c9adc42c8a88c2308d88ce632&number=1").subscribe((response: any) => { console.log(response)});
  }

  //testing branch

  //autocomplete api call for ingredient
  searchIngredientByName(foodName: string): any {
    return this.http.get(`https://api.spoonacular.com/food/ingredients/search?query=${foodName} &apiKey=ff94e67c9adc42c8a88c2308d88ce632&=`);
  }

  bankId: number = 0;

  setBankId(bId: number): void {
    this.bankId = bId;
  }

  getBankId(): number {
    return this.bankId;
  }


  // login to the page
  loginName: string = "Default";

  setLogin(newlogin: string): void {
    this.loginName = newlogin;
  }

  getLogin(): string {
    return this.loginName;
  }

  createNewUser(newUsers: string): any {
    console.log(newUsers);
    const params = new HttpParams();

    return this.http.post(this.inventoryUrl + "api/FoodBank/AddUser" + "?loginId=" + newUsers, params);
  }

  //adding new ingredient to ingredient list
  addNewIngredient(newIngredient: Ingredient): any {
    console.log(newIngredient);
    const params = new HttpParams();

    return this.http.post(this.inventoryUrl + "api/FoodBank/AddFood" + "?foodName=" + newIngredient.foodName + "&apiId=" + newIngredient.apiId + "&foodImages=" + newIngredient.foodImages, params);
  }

  //single ingredient
  oneIngredient(oneIngredient: string): any {
    return this.http.get(this.inventoryUrl + "api/FoodBank/ingredientName?foodName=" + oneIngredient);
  }

  //donating ingredients

  checkIngredient(check: string): any {
    return this.http.get(this.inventoryUrl + "api/FoodBank/CheckIngredient?foodName=" + check);
  }

  //return all ingredients
  getIngredients(): any {
    return this.http.get(this.inventoryUrl + "api/FoodBank/AllIngredients");
  }

  //return inventory
  getInventory(): any {
    return this.http.get(this.inventoryUrl + "api/FoodBank/GetInventory");
  }
  //add to inventory
  addNewInventory(newInventory: Inventory): any {
    console.log(newInventory);
    const params = new HttpParams();

    return this.http.post(this.inventoryUrl + "api/FoodBank/AddToInventory" + "?bankId=" + newInventory.BankId + "&ingredientsId=" + newInventory.IngredientsId + "&quantity=" + newInventory.Quantity, params);
  }

  getIngredientByBank(bankId: number): any {
    return this.http.get(this.inventoryUrl + "api/FoodBank/GetIngredientsByBankId" + "?bankId=" + bankId);
  }

  addToCart(ingredient: Ingredient): void {
    this.userCart.push(ingredient);
    console.log(this.userCart)
  }


  getCart(): any {
    return this.userCart;
  }

  clearCart(): void {
    this.userCart = [];
  }

  reduceQuantity(bankId:number, ingredientId:number, quantity:number): any {
    const params = new HttpParams();
    return this.http.put(this.inventoryUrl + "api/FoodBank/SubtractQuantity" + "?bankId=" + bankId + "&ingredientId=" + ingredientId + "&quantity=" + quantity, params);
  }


  deleteFromCart(ingredient: Ingredient): void {
    let deleteTask = this.userCart.indexOf(ingredient);
    this.userCart.splice(deleteTask, 1);
    console.log(this.userCart)
  }
  //searchFoodName(foodName: string): any {
    //return this.http.get(this.inventoryUrl + "/ingredientName" + )
 // }
}
