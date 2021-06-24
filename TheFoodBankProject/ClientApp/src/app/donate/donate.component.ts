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
   /* this.getMyIngredients();*/
  }

  

  public showMyMessage = false

  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 800)
    
  }

  getMyIngredients(): void {
    this.inventoryService.getIngredients().subscribe(ingredients => this.ingredients = ingredients)
  }

  addIngredient(form: NgForm): void {
    let search = form.form.value.searchTerm;
   /* let response = this.searchIngredients(search);*/
    this.inventoryService.checkIngredient(search).subscribe(
      (check: boolean) => {
        console.log(check);
        if (check == true) {
          /* this exists in database add to bank inventory*/
            this.inventoryService.oneIngredient(search).subscribe((oneItem: any) => {
              console.log(oneItem);
              let newInventory: Inventory = {
                bankId: form.form.value.bankId,
                ingredientsId: oneItem.id,
                quantity: form.form.value.quantity,
                id: 0
              }
              this.inventoryService.addNewInventory(newInventory).subscribe(n => {
                console.log(n);
              });
            })
          
        }
        else
        {
          /* this does not exists in database  create ingredient, add to ingredientDB, then add to bank name */
          this.inventoryService.searchIngredientByName(search).subscribe(response => {
            let newIngredient: Ingredient = {
            foodName: search,
            apiId:response.results[0].id, //this needs to come from the foodAPI
            foodImages: response.results[0].image,//this needs to come from the foodAPI
            id:0
          }

            this.inventoryService.addNewIngredient(newIngredient).subscribe(r => {
              this.inventoryService.oneIngredient(search).subscribe((oneItem: any) => {
                console.log(oneItem);
                let newInventory: Inventory = {
                  bankId: form.form.value.bankId,
                  ingredientsId: oneItem.id,
                  quantity: form.form.value.quantity,
                  id: 0
                }
                this.inventoryService.addNewInventory(newInventory).subscribe(n => {
                  console.log(n);
                });
              })
            });
            /* making new inventory*/
            

            
          })
        }
      }
    );
  //  let newIngredient: Ingredient = {
  //    foodName: form.form.value.foodName,
  //    apiId:response.results[0].id, //this needs to come from the foodAPI
  //    foodImages: response.results[0].image,//this needs to come from the foodAPI
  //    id:0
  //  }

  //  /*this.inventoryService.addNewIngredient(newIngredient);*/
  }

  addInventory(form: NgForm): void {
    
    let newInventory: Inventory = {
      bankId: 0,//we want this to be current bankID from page
      ingredientsId: 0,//how to add items to inventory when using the api for igredients and also inventory only uses numeric values to store
      quantity: form.form.value.quantity,
      id: 0
    }
    this.inventoryService.addNewInventory(newInventory);
  }


  searchIngredients(foodName: string): any {
    this.inventoryService.searchIngredientByName(foodName).subscribe(ingredient => this.ingredient = ingredient)
  }


}
