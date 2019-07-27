import { Component, OnInit } from '@angular/core';
import { ProductRepository } from "../model/product.repository";
import { Product } from "../model/product.model";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  moduleId: module.id,
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public selectedCategory = null;
  public productPerPage = 4;
  public selectedPage = 1;

  constructor(private repostiory: ProductRepository,
  private cart: Cart,
  private router: Router
  ) { }

  ngOnInit() {
  }

  get products(): Product[]{
    let pageIndex = (this.selectedPage - 1) * this.productPerPage;
    return this.repostiory.getProducts(this.selectedCategory)
    .slice(pageIndex, pageIndex + this.productPerPage);
  }

  get categories(): string[]{
      return this.repostiory.getCatetories();
  }

  changeCategory(newCategory?: string){
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  changePageSize(newPageSize: number){
    this.productPerPage = Number(newPageSize);// we need to parse string value to number
    this.changePage(1);
  }

  get pageNumbers(): number[]{
    return Array(Math.ceil(this.repostiory
    .getProducts(this.selectedCategory).length / this.productPerPage))
    .fill(0).map((x, i) => i + 1);
  }

  get pageCount(): number{
    return Math.ceil(this.repostiory.getProducts(this.selectedCategory).length / this.productPerPage);
  }

  addProductToCart(product: Product){
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }

}
