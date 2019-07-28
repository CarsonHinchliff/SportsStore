import { Component } from '@angular/core';
import { Product } from "./model/product.model";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  // template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  newProduct: Product = new Product(1, '');
  changeModel(seed: string, add:boolean = false){
    if(add){
      this.newProduct.name += seed;
    }else{
      this.newProduct.name = this.newProduct.name.substr(0, this.newProduct.name.length - 1);
    }
  }
}
