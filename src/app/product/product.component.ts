import { DatePipe } from '@angular/common';
import { ProductsModel } from './../shared/models/ProductsModel';
import { ProductsService } from './../shared/services/products.service';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { elementAt, Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  footerLoad: boolean = false;
  displayedColumns: string[] = [
    'name',
    'short_code',
    'category',
    'price',
    'description',
    'image_url',
    'is_best_achieved',
    'created_date',
    'origin',
    'quantity',
    'ratings',
    'action',
  ];
  dataSource: MatTableDataSource<ProductsModel>;
  temp: any;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService,
    private datepipe: DatePipe
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  formattedDate: any;
  ngAfterViewInit(): void {
    try {
      this.subscription = this.productsService
        .getProducts()
        .subscribe((data: any) => {
          this.footerLoad = true;
          this.dataSource = new MatTableDataSource<ProductsModel>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } catch (err) {}
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  formatDate(date: any) {
    return this.datepipe.transform(date, 'yyyy-MM-dd')?.toString();
  }
  deleteProductFromList(id: any) {
    this.subscription2 = this.productsService
      .deleteProductById(id)
      .subscribe((data) => {
        this.subscription = this.productsService
          .getProducts()
          .subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<ProductsModel>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        window.alert(data);
      });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
