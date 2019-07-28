import { Component, OnInit } from '@angular/core';
import { OrderRepository } from "../model/order.repository";
import { Order } from "../model/order.model";

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  includeShippe = false;

  constructor(private repository: OrderRepository) { }

  getOrders(): Order[]{
    return this.repository.getOrders()
    .filter(o => this.includeShippe || !o.shipped);
  }

  toggleShip(order: Order){
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  delete(id: number){
    this.repository.deleteOrder(id);
  }

  ngOnInit() {
  }

}