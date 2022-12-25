import { Subscription } from 'rxjs';
import { ProductsModel } from './../../shared/models/ProductsModel';
import { ProductsService } from './../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AnonymousSubject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  formattedDate: any;
  duplicateNameMessage: string = '';
  duplicateShortCodeMessage: string = '';
  allProduct: ProductsModel[] = [];
  footerLoad: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private datepipe: DatePipe = new DatePipe('en-US'),
    private router: Router
  ) {}
  id: any;
  selectedProduct: any;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  buttonRole: string;
  @Input() formRole = '';
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription3 = this.productsService
      .getProducts()
      .subscribe((data) => {
        this.allProduct = data;
      });

    this.subscription = this.productsService
      .getProductById(this.id)
      .subscribe((data) => {
        this.footerLoad = true;
        this.selectedProduct = data;
        this.formattedDate = this.datepipe.transform(
          this.selectedProduct.created_date,
          'yyyy-MM-dd'
        );
        this.selectedProduct.created_date = this.formattedDate.toString();
      });
    if (this.selectedProduct == undefined) {
      this.selectedProduct = {};
    }
  }
  submit(addProduct: NgForm) {
    try {
      if (
        addProduct.valid &&
        !this.duplicateNameMessage &&
        !this.duplicateShortCodeMessage
      ) {
        if (this.buttonRole === 'Add') {
          this.subscription2 = this.productsService
            .addProduct(this.selectedProduct)
            .subscribe((data) => {
              console.log(data);
            });
          window.alert('Product Added Successfully');
        } else if (this.buttonRole === 'Update') {
          this.subscription2 = this.productsService
            .updateProduct(this.selectedProduct, this.id)
            .subscribe((data) => {
              console.log(data);
            });
          window.alert('Product Updated Successfully');
          this.router.navigateByUrl('/Product');
        }
        addProduct.reset();
      } else {
        console.log(this.selectedProduct);
      }
    } catch (err) {}
  }
  buttonRoleFunction(role: any) {
    this.buttonRole = role;
    return role;
  }

  duplicateNameCheck(newValue: any) {
    this.duplicateNameMessage = '';
    this.allProduct.map((p) => {
      if (p.name == newValue) {
        this.duplicateNameMessage = 'Product name is already Taken';
      }
    });
  }
  duplicateShortCodeCheck(newValue: any) {
    this.duplicateShortCodeMessage = '';
    this.allProduct.map((p) => {
      if (p.short_code == newValue) {
        this.duplicateShortCodeMessage = 'Product ShortCode is already Taken';
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
