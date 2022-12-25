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
  presentCart: any;
  isPresentInCart: boolean = false;
  selectedProduct: any;
  productQuantity: number = 0;
  subscription: Subscription[] = [];

  cartItem: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription.push(
      this.productsService.getProductById(this.id).subscribe((data) => {
        this.selectedProduct = data;
      })
    );
    if (this.selectedProduct == undefined) {
      this.selectedProduct = '';
    }
  }

  addToCart(product_id: any) {
    this.cartItem = {
      product_id: this.id,
      product_quantity: this.productQuantity,
    };
    this.selectedProduct['quantity'] -= this.cartItem.product_quantity;

    this.subscription.push(
      this.cartService.getAllCartItems().subscribe((cItem: any) => {
        cItem.map((c: any, i: any) => {
          if (c.product_id == product_id) {
            this.isPresentInCart = true;
            this.cartItem.product_quantity += cItem[i]['product_quantity'];
            this.subscription.push(
              this.cartService
                .updateCartItem(this.cartItem, cItem[i]['_id'])
                .subscribe((data) => {
                  this.subscription.push(
                    this.productsService
                      .updateProduct(
                        this.selectedProduct,
                        this.selectedProduct['_id']
                      )
                      .subscribe((d) => {
                        this.productQuantity = 0;
                        window.alert('Product Added To Cart');
                      })
                  );
                })
            );
          }
        });
        if (this.isPresentInCart == false) {
          this.subscription.push(
            this.cartService.addCartItem(this.cartItem).subscribe((data) => {
              this.subscription.push(
                this.productsService
                  .updateProduct(
                    this.selectedProduct,
                    this.selectedProduct['_id']
                  )
                  .subscribe((d) => {
                    this.productQuantity = 0;
                    window.alert('Product Added To Cart');
                  })
              );
            })
          );
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
