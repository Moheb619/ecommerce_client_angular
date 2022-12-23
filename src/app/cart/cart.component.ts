import { ProductsService } from './../shared/services/products.service';
import { CartService } from './../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  allCartData = [];
  allCartDataDetails: any = [];
  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}
  ngOnInit(): void {
    this.subscription = this.cartService
      .getAllCartItems()
      .subscribe((data: any) => {
        this.allCartData = data;
        this.allCartData.map((cart_data) => {
          this.subscription2 = this.productService
            .getProductById(cart_data['product_id'])
            .subscribe((product_data) => {
              this.allCartDataDetails.push(product_data);
            });
        });
      });
  }
  deleteSelectedCartItem(id: any) {
    this.subscription3 = this.cartService
      .deleteCartItem(id)
      .subscribe((data) => {
        this.subscription = this.cartService
          .getAllCartItems()
          .subscribe((data: any) => {
            this.allCartData = data;
            this.allCartDataDetails = [];
            this.allCartData.map((cart_data) => {
              this.subscription2 = this.productService
                .getProductById(cart_data['product_id'])
                .subscribe((product_data) => {
                  this.allCartDataDetails.push(product_data);
                });
            });
          });
        window.alert(data);
      });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
