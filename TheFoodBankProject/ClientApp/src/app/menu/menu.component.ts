import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory'

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
/** Menu component*/
export class MenuComponent {
  /** Menu ctor */

  inventories:Inventory[]=[]
    constructor(private inventoryService:InventoryService) {}

  getMyInventory(): void {
    this.inventoryService.getInventory().subscribe(inventories => this.inventories = inventories)
  }


}
