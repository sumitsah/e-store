import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Product, ProductCart, ProductCartDetails } from '../model/product';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = `${environment.apiUrl}products`;
  http = inject(HttpClient);
  productCount = new BehaviorSubject<number>(0);
  localStorage = inject(LocalStorageService);

  products: Product[] = [];
  cartProducts!: ProductCartDetails[];

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((err, caught) => {
        throw `error => ${err}`
      })
    )
  }

  getProductCart() {
    return this.http.get('https://fakestoreapi.com/carts/user/1')
  }

  addProductToCart(productCart: ProductCart) {
    return this.http.post('https://fakestoreapi.com/carts', productCart)
  }

  addItemToCart(product: Product) {
    if (this.localStorage.getItem('productCart')) {
      this.cartProducts = JSON.parse(this.localStorage.getItem('productCart') ?? '{"productId": 0,"quantity": 0}')
      if (this.cartProducts.some(pro => pro.productId === product.id)) {
        this.cartProducts.forEach((pro, i) => {
          if (pro.productId === product.id) {
            pro.quantity++;
          }
        });
        this.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
        this.localStorage.setItem('productCart', this.cartProducts);
      } else {
        let productCart = [...this.cartProducts, { productId: product.id, quantity: 1 }];
        this.productCount.next(productCart.reduce((acc, curr) => acc = curr.quantity + acc, 0));
        this.localStorage.setItem('productCart', productCart);
      }
    } else {
      let productCart = [{ productId: product.id, quantity: 1 }]
      this.localStorage.setItem('productCart', productCart);
      this.productCount.next(1);
    }
  }

  removeItemFromCart(product: Product) {
    this.cartProducts = JSON.parse(this.localStorage.getItem('productCart') ?? '{"productId": 0,"quantity": 0}')

  }
}
