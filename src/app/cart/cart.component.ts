import { ProductsModel } from './../shared/models/ProductsModel';
import { ProductsService } from './../shared/services/products.service';
import { CartService } from './../shared/services/cart.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  allCartAndProductData: any = [];
  subTotal: number = 0;
  shipping: number = 20;
  tax: number = 10;
  total: number;
  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.subscription.push(
      this.cartService.getAllCartItems().subscribe((data: any) => {
        data.map((cData: any, i: any) => {
          this.subscription.push(
            this.productsService
              .getProductById(cData['product_id'])
              .subscribe((pData: any) => {
                data[i]['name'] = pData['name'];
                data[i]['description'] = pData['description'];
                data[i]['image_url'] = pData['image_url'];
                data[i]['price'] = pData['price'] * data[i]['product_quantity'];
                this.subTotal += data[i]['price'];
                this.allCartAndProductData.push(data[i]);
              })
          );
        });
      })
    );
  }
  deleteSelectedCartItem(cart_id: any, product_id: any, product_quantity: any) {
    this.subscription.push(
      this.productsService.getProductById(product_id).subscribe((d) => {
        d['quantity'] += product_quantity;
        this.subscription.push(
          this.productsService.updateProduct(d, d['_id']).subscribe((d) => {})
        );
      })
    );
    this.subscription.push(
      this.cartService.deleteCartItem(cart_id).subscribe((d) => {
        this.allCartAndProductData = [];
        this.subTotal = 0;
        this.subscription.push(
          this.cartService.getAllCartItems().subscribe((data: any) => {
            data.map((cData: any, i: any) => {
              this.subscription.push(
                this.productsService
                  .getProductById(cData['product_id'])
                  .subscribe((pData: any) => {
                    data[i]['name'] = pData['name'];
                    data[i]['description'] = pData['description'];
                    data[i]['image_url'] = pData['image_url'];
                    data[i]['price'] =
                      pData['price'] * data[i]['product_quantity'];
                    this.subTotal += data[i]['price'];
                    this.allCartAndProductData.push(data[i]);
                  })
              );
            });
          })
        );
      })
    );
  }
  getTotalPrice() {
    if (this.subTotal) {
      this.total =
        this.subTotal + this.shipping + this.subTotal * (this.tax / 100);
    } else {
      this.total = 0;
    }

    return this.total;
  }
  ngOnDestroy() {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}
