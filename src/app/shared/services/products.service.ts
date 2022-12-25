import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsModel } from '../models/ProductsModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private endPoint: string = environment.apiEndPoint;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(this.endPoint + 'products/getAllProducts');
  }
  getProductById(id: string): Observable<any> {
    return this.http.get(this.endPoint + `products/getProductById/${id}`);
  }
  addProduct(product: ProductsModel): Observable<any> {
    return this.http.post(this.endPoint + 'products/addProduct', product);
  }

  updateProduct(product: ProductsModel, id: any): Observable<any> {
    return this.http.put(
      this.endPoint + `products/updateProduct/${id}`,
      product
    );
  }

  deleteProductById(id: any): Observable<any> {
    return this.http.delete(this.endPoint + `products/deleteProduct/${id}`);
  }
}
