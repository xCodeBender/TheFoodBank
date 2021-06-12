import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Ingredient } from '../ingredient'
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.scss']
})
/** Donate component*/
export class DonateComponent {
  ingredients: Ingredient[]=[];
    /** Donate ctor */
  constructor(private inventoryService: InventoryService) { }


  ngOnInit(): void {
    this.getMyIngredients();
  }


  getMyIngredients(): void {
    this.inventoryService.getIngredients().subscribe(ingredients => this.ingredients = ingredients)
  }

  addIngredient(form: NgForm): void {
    let newIngredient: Ingredient = {
      foodName: form.form.value.foodName,
      apiId:0, //this needs to come from the foodAPI
      foodImages: "",//this needs to come from the foodAPI
      id:0
    }

    this.inventoryService.addNewIngredient
  }

}
