import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";


import { AppComponent } from './app.component';
import { StoreModule } from "./store/store.module";
import { StoreComponent } from "./store/store.component";
import { CartDetailComponent } from "./store/cart-detail.component";
import { CheckoutComponent } from "./store/checkout.component";
import { StoreFirstGuard } from "./storeFirst.guard";
import { AdminModule } from "./admin/admin.module";
import { PaModel } from "./directives/twoway.directive";
import { PaAttrDirective } from "./directives/attr.directive";
import { PaStructureDirective } from "./directives/structure.directive";
import { PaIteratorDirective } from "./directives/iterator.directive";


@NgModule({
  declarations: [
    AppComponent,
    PaModel, 
    PaAttrDirective,
    PaStructureDirective,
    PaIteratorDirective
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      {path: "store", component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      {path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard]},
      {path: "admin", loadChildren: "app/admin/admin.module#AdminModule", canActivate: [StoreFirstGuard]},
      {path: "**", redirectTo: "/store"}
    ])
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
