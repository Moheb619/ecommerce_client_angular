import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsModel } from '../models/ProductsModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  ELEMENT_DATA: ProductsModel[] = [
    {
      name: 'Apple',
      short_code: 'cvxbxcghljsdh',
      category: 'computer',
      price: 30000,
      description: 'very good laptop',
      image_url:
        'https://www.seekpng.com/png/detail/252-2528408_hp-pavilion-14-ce1000tu-laptop-hp-pavilion-14.png',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 18,
      ratings: 5,
    },
    {
      name: 'HP',
      short_code: '29384kljsdh',
      category: 'computer',
      price: 40000,
      description: 'very good laptop',
      image_url:
        'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/H/6H9E0PA-1_T1659921531.png',
      is_best_achieved: false,
      created_date: '2022-11-26',
      origin: 'computer',
      quantity: 5,
      ratings: 4,
    },
    {
      name: 'Lenovo',
      short_code: 'dgsdfgfbdfg',
      category: 'computer',
      price: 10000,
      description: 'very good laptop',
      image_url:
        'https://www.nicepng.com/png/detail/251-2515848_second-hand-laptop-shop-hp-envy-15-vs.png',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 52,
      ratings: 2,
    },
    {
      name: 'Acer',
      short_code: 'sryhe65utnn',
      category: 'computer',
      price: 20000,
      description: 'very good laptop',
      image_url:
        'https://www.startech.com.bd/image/cache/catalog/laptop/toshiba/satellite-pro-c40-g-109/satellite-pro-c40-g-109-01-228x228.webp',
      is_best_achieved: false,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 12,
      ratings: 4,
    },
    {
      name: 'Asus',
      short_code: 'sryhedg65utnn',
      category: 'computer',
      price: 70000,
      description: 'very good laptop',
      image_url:
        'https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 16,
      ratings: 4,
    },
    {
      name: 'MSI',
      short_code: 'sryhedg',
      category: 'computer',
      price: 80000,
      description: 'very good laptop',
      image_url: 'https://pngimg.com/uploads/laptop/laptop_PNG5912.png',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 32,
      ratings: 1,
    },
    {
      name: 'Microsoft Surface',
      short_code: 'fdg384kljsdh',
      category: 'computer',
      price: 90000,
      description: 'very good laptop',
      image_url:
        'https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1458.jpg?w=2000',
      is_best_achieved: false,
      created_date: '2021-10-12',
      origin: 'computer',
      quantity: 13,
      ratings: 2,
    },
    {
      name: 'Razer',
      short_code: 'sryhedsdfdg',
      category: 'computer',
      price: 120000,
      description: 'very good laptop',
      image_url:
        'https://www.popsci.com/uploads/2022/08/25/image-2.jpeg?auto=webp&width=1440&height=1080',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 3,
      ratings: 5,
    },
    {
      name: 'Razer',
      short_code: 'sryhedsdfd',
      category: 'computer',
      price: 120000,
      description: 'very good laptop',
      image_url:
        'https://helios-i.mashable.com/imagery/articles/00kPIrVzQVxFWRa8RHxFjCc/hero-image.fill.size_1248x702.v1654199474.jpg',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 3,
      ratings: 3,
    },
    {
      name: 'Razer',
      short_code: 'sryhedgfdgfsdfd',
      category: 'computer',
      price: 120000,
      description: 'very good laptop',
      image_url: 'https://cdn.siasat.com/wp-content/uploads/2021/11/hp.jpg',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 3,
      ratings: 4,
    },
    {
      name: 'Razer',
      short_code: 'gfdsdfgfsdfd',
      category: 'computer',
      price: 120000,
      description: 'very good laptop',
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8itOwbO9UR3fcYG5LQ7YpfWcGXOG6vMD7A&usqp=CAU',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 3,
      ratings: 2,
    },
    {
      name: 'Razer',
      short_code: 'gfdsdfgfdfgsdfd',
      category: 'computer',
      price: 120000,
      description: 'very good laptop',
      image_url:
        'https://www.popsci.com/uploads/2022/08/25/image-2.jpeg?auto=webp&width=1440&height=1080',
      is_best_achieved: true,
      created_date: '2022-12-22',
      origin: 'computer',
      quantity: 3,
      ratings: 1,
    },
  ];
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
