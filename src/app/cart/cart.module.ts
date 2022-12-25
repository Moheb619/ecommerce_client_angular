import { RequiredComponentModule } from './../required-component/required-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [CommonModule, CartRoutingModule, RequiredComponentModule],
})
export class CartModule {}
