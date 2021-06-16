import { Component } from '@angular/core';
import { InventoryService } from 'src/app/inventory.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
/** header component*/
export class HeaderComponent {
    /** header ctor */
  constructor(private inventoryService: InventoryService) {

  }


  getLogin(): string {
    return this.inventoryService.getLogin();
  }
}
