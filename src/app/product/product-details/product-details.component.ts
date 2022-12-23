import { CartService } from './../../shared/services/cart.service';
import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartsModel } from 'src/app/shared/models/CartsModel';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  id: any;
  selectedProduct: any;
  productQuantity: number = 1;
  subscription: Subscription;
  subscription2: Subscription;
  cartItem: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productsService
      .getProductById(this.id)
      .subscribe((data) => {
        this.selectedProduct = data;
      });
    if (this.selectedProduct == undefined) {
      this.selectedProduct = '';
    }
  }

  addToCart() {
    this.cartItem = {
      product_id: this.id,
      product_quantity: this.productQuantity,
    };
    this.subscription2 = this.cartService
      .addCartItem(this.cartItem)
      .subscribe((data) => {
        this.productQuantity = 1;
        window.alert('Product Added To Cart');
      });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
