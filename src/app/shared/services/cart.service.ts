import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartsModel } from '../models/CartsModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private endPoint: string = environment.apiEndPoint;
  constructor(private http: HttpClient) {}
  getAllCartItems(): Observable<any> {
    return this.http.get(this.endPoint + 'cart/getAllCartItems');
  }
  addCartItem(product: CartsModel): Observable<any> {
    return this.http.post(this.endPoint + 'cart/addCartItem', product);
  }

  getCartItemById(id: string): Observable<any> {
    return this.http.get(this.endPoint + `cart/getCartItemById/${id}`);
  }

  updateCartItem(product: CartsModel, id: any): Observable<any> {
    console.log(product);
    return this.http.put(this.endPoint + `cart/updateCartItem/${id}`, product);
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete(this.endPoint + `cart/deleteCartItem/${id}`);
  }

  deleteAllCartItem(): Observable<any> {
    return this.http.delete(this.endPoint + `cart/deleteAllCartItem`);
  }
}
