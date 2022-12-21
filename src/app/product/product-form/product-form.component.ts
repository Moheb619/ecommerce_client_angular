import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ProductsService } from './../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  submit(addProduct: NgForm) {
    console.log(addProduct);
  }
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
    console.log(this.selectedProduct);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
