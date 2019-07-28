
import { Injectable } from "@angular/core";
import { Http, RequestMethod, Request } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
import { Order } from "./order.model";
import "rxjs/add/operator/map";

const PROTOCAL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource{
    baseUrl: string;
    auth_token: string;

    constructor(private http: Http){
        this.baseUrl = `${PROTOCAL}://${location.hostname}:${PORT}/`;
    }

    
    private sendRequest(verb: RequestMethod,
        url: string, body?: Product|Order, auth: boolean = false): Observable<Product|Order>
    {
        let request = new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        
        if(auth && this.auth_token != null){
            request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
        }

        return this.http.request(request).map(res => res.json());
    }

    authenticate(user: string, pass: string): Observable<boolean>{
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.baseUrl + "login", // find the route in authMiddleware.js
            body: {name: user, password: pass}
        })).map(res => {
            let r = res.json();
            this.auth_token = r.success ? r.token: null;

            return r.success;
        });
    }

    getProducts(): Observable<Product[]>{
        return this.sendRequest(RequestMethod.Get, "products") as Observable<Product[]>;
    }

    saveProduct(product: Product): Observable<Product>{
        return this.sendRequest(RequestMethod.Post, "products", product, true) as Observable<Product>;
    }

    updateProduct(product: Product): Observable<Product>{
        return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product, true) as Observable<Product>;
    }

    deleteProduct(id: number): Observable<Product>{
        return this.sendRequest(RequestMethod.Delete, `products/${id}`, null, true) as Observable<Product>;
    }

    getOrders(): Observable<Order[]>{
        return this.sendRequest(RequestMethod.Get, `orders`, null, true) as Observable<Order[]>;
    }

    saveOrder(order: Order): Observable<Order>{
        return this.sendRequest(RequestMethod.Post, "orders", order, true) as Observable<Order>;
    }

    deleteOrder(id: number): Observable<Order>{
        return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null, true) as Observable<Order>;
    }

    updateOrder(order: Order): Observable<Order>{
        return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order, true) as Observable<Order>;
    }
}