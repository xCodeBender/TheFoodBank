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

  constructor(private inventoryService: InventoryService, public router: Router ) { }
  
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
    this.getCartDistinct().forEach((i: Ingredient) => {
      let count: number = this.getCount(i);
      this.inventoryService.reduceQuantity(this.inventoryService.bankId, i.id, count).subscribe(response => console.log(response));
      console.log("count" + count);
      console.log("bankId" + this.inventoryService.getBankId());
      console.log("id" + i.id);
    })
    
  }




}

