import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  short_code: any;
  selectedProduct: ProductsModel;
  ELEMENT_DATA: any = [];
  subscription: Subscription;
  ngOnInit() {
    this.short_code = this.route.snapshot.paramMap.get('short_code');
    this.subscription = this.productsService.getProducts().subscribe((data) => {
      this.ELEMENT_DATA = data;
    });
    this.ELEMENT_DATA.map((data: any) => {
      if (data.short_code === this.short_code) {
        this.selectedProduct = data;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
