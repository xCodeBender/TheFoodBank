import { Component } from '@angular/core';
import { InventoryService } from 'src/app/inventory.service';
import { Ingredient } from '../app/ingredient';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
/** confirmation component*/
export class ConfirmationComponent {
    /** confirmation ctor */
  constructor(private inventoryService: InventoryService) {

  }

  ngOnInit(): void {
    this.getCartDistinct();
    console.log(this.clear);
    this.inventoryService.clearCart();
  }

  getCartDistinct(): any {
    this.clear = this.inventoryService.getCart().filter((x, i, a) => a.indexOf(x) == i);
    this.all = this.inventoryService.getCart();
  }


  getCount(i: Ingredient): number {
    let result = this.all.filter((item) => {
      return item.id == i.id
    });
    console.log(result);
    console.log(i.id);
    return result.length;
  }

  clear: Ingredient[] = [];

  all: Ingredient[] = [];
}
