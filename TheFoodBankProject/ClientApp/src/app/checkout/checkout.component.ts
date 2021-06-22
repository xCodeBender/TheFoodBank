import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../ingredient';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
/** Checkout component*/
export class CheckoutComponent {
  /** Checkout ctor */

  ngOnInit(): void { }

  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryService, public router: Router) { }

  getLogin(): string {
    return this.inventoryService.getLogin();
  }
  
  getCart(): any {
    return this.inventoryService.getCart();
  }

 
  getCartDistinct(): any {
    return this.inventoryService.getCart().filter((x, i, a) => a.indexOf(x) == i);
  }


  getCount(i: Ingredient): number {
    let result = this.inventoryService.getCart().filter((item) => {
      return item.id == i.id
    });
    console.log(result);
    console.log(i.id);
    return result.length;
  }



  subtractQuantity(): void {
    this.getNextOrderId(this.getCartDistinct());
    this.getCartDistinct().forEach((i: Ingredient) => {
      let count: number = this.getCount(i);
      this.inventoryService.reduceQuantity(this.inventoryService.bankId, i.id, count).subscribe(response => console.log(response));
      //console.log("count" + count);
      //console.log("bankId" + this.inventoryService.getBankId());
      //console.log("id" + i.id);
      
    })
    /*this.getNextOrderId(this.getCartDistinct());*/
    /*console.log(this.getNextOrderId());*/
    
    
  }

  getNextOrderId(ingredient: Ingredient[]): void {
    let result: number = 0;
    this.inventoryService.getNextOrderId().subscribe(response => {
      result = response
      /* making orders here */

      ingredient.forEach((i: Ingredient) => {
        let count = this.getCount(i);
        console.log("count" + count);
        this.inventoryService.getUser().subscribe(
          userResponse => {
            this.inventoryService.newOrder(result, userResponse.id, i.id, count).subscribe
              ((newOrderResponse) => {
                console.log(newOrderResponse);
              })
          }
        );
      })
      this.router.navigate(['Confirmation']);
      
    });
   
  }

  

}

