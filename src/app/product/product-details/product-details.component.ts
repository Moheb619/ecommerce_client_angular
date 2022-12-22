import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  id: any;
  selectedProduct: any;
  subscription: Subscription;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productsService
      .getProductByShortCode(this.id)
      .subscribe((data) => {
        this.selectedProduct = data;
      });
    if (this.selectedProduct == undefined) {
      this.selectedProduct = '';
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
