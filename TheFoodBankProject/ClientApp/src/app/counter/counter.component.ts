import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;

  constructor(private inventoryService: InventoryService) {

  }

  ngOnInit() {
    this.inventoryService.testApi();
  }
  public incrementCounter() {
    this.currentCount++;
  }
}
