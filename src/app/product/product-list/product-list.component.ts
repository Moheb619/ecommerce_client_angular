import { ProductsService } from './../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
  subscription: Subscription;
  ELEMENT_DATA: any = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.subscription = this.productsService.getProducts().subscribe((data) => {
      this.ELEMENT_DATA = data;
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
