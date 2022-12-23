import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartsModel } from '../models/CartsModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  getAllCartItems(): Observable<any> {
    return this.http.get('http://localhost:8800/api/cart/getAllCartItems');
  }
  addCartItem(product: CartsModel): Observable<any> {
    return this.http.post(
      'http://localhost:8800/api/cart/addCartItem',
      product
    );
  }
  deleteCartItem(id: any): Observable<any> {
    return this.http.delete(
      `http://localhost:8800/api/cart/deleteCartItem/${id}`
    );
  }
}
