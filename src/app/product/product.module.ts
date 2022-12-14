import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListTableComponent } from './product-list-table/product-list-table.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductListTableComponent,
  ],
  imports: [CommonModule, ProductRoutingModule],
  exports: [ProductRoutingModule, ProductListComponent],
})
export class ProductModule {}
