import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddProductComponent } from './add-product/add-product.component';
@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [ProductRoutingModule, ProductListComponent],
})
export class ProductModule {}
