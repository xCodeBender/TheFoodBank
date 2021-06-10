import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient) {

  }

  testApi(): void {
    this.http.get("https://api.spoonacular.com/food/ingredients/search?query=baking mix&apiKey=ff94e67c9adc42c8a88c2308d88ce632&number=1").subscribe((response: any) => { console.log(response)});
  }
}
