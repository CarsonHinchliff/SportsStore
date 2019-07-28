

import { Injectable } from "@angular/core";
import { StaticDataSource } from "./static.datasource";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { RestDataSource } from "./rest.datasource";
import { Cart } from "./cart.model";
@Injectable()
export class OrderRepository{
    orders: Order[] = [];
    private loaded: boolean = false;

    // constructor(private dataSource: RestDataSource){
    constructor(private dataSource: RestDataSource, private cart: Cart){
        
    }

    loadOrders(){
        this.loaded = true;
        this.dataSource.getOrders()
        .subscribe(res => {
            //this.orders = res as Order[];
            (res as Order[]).forEach(o => {
                o.cart = this.cart;
            });

            this.orders = res;
        });
    }
    

    getOrders(): Order[]{
        if(!this.loaded)
        {
            this.loadOrders();
        }

        return this.orders;
    }

    saveOrder(order: Order): Observable<Order>{
        return this.dataSource.saveOrder(order);
    }

    updateOrder(order: Order){
        this.dataSource.updateOrder(order)
        .subscribe((res: Order) => {
            this.orders.splice(this.orders.findIndex(o => o.id == res.id), 1, res);
        });
    }

    deleteOrder(id: number){
        this.dataSource.deleteOrder(id)
        .subscribe(res => {
            this.orders.splice(this.orders.findIndex(o => o.id == id));
        });
    }
}