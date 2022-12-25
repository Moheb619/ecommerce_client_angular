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

  getCartItemById(id: string): Observable<any> {
    return this.http.get(
      `http://localhost:8800/api/cart/getCartItemById/${id}`
    );
  }

  updateCartItem(product: CartsModel, id: any): Observable<any> {
    console.log(product);
    return this.http.put(
      `http://localhost:8800/api/cart/updateCartItem/${id}`,
      product
    );
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete(
      `http://localhost:8800/api/cart/deleteCartItem/${id}`
    );
  }

  deleteAllCartItem(): Observable<any> {
    return this.http.delete(`http://localhost:8800/api/cart/deleteAllCartItem`);
  }
}
