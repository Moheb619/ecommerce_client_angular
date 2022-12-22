import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ProductsService } from './../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  submit(addProduct: NgForm) {
    console.log(addProduct);
  }
  formattedDate: any;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private datepipe: DatePipe = new DatePipe('en-US')
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
        this.formattedDate = this.datepipe.transform(
          this.selectedProduct.created_date,
          'yyyy-MM-dd'
        );
        this.selectedProduct.created_date = this.formattedDate.toString();
      });
    if (this.selectedProduct == undefined) {
      this.selectedProduct = '';
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
