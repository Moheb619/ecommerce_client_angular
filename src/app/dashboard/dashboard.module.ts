import { RequiredComponentModule } from './../required-component/required-component.module';
import { ProductModule } from './../product/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ProductModule,
    RequiredComponentModule,
  ],
})
export class DashboardModule {}
