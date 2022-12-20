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
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit, OnInit, OnDestroy {
  subscription: Subscription;
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
    'rating',
    'action',
  ];
  ELEMENT_DATA = [];
  dataSource: MatTableDataSource<ProductsModel>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.productsService.getProducts().subscribe((data) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<ProductsModel>(
        this.ELEMENT_DATA
      );
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
