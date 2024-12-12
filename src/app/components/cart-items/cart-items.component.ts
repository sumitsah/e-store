import { Component, computed, effect, inject, OnInit, signal, untracked, WritableSignal } from '@angular/core';
import { CartListProduct, Product, ProductCartDetails } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'store-cart-items',
  imports: [CurrencyPipe],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {
  cartList = signal<Product[]>([]);
  cartProducts: ProductCartDetails[] = [];

  originalPrice = computed(() =>
    Math.round(this.cartList().reduce((acc, curr) => {
      return (acc = (curr.price * (curr.quantity || 1)) + acc);
    }, 0)))

  savings = computed(() => Math.round((this.originalPrice() * 5 / 100)));
  pickupCharge = computed(() => this.originalPrice() > 10000 ? 0 : 99);
  tax = computed(() => this.originalPrice() * 18 / 100);
  total = computed(() => Math.round((this.originalPrice() + this.pickupCharge() + this.tax() - this.savings())));


  productService = inject(ProductService);
  localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((cartList: Product[]) => {
      this.cartProducts = JSON.parse(this.localStorage.getItem('productCart') ?? '{ "productId": 0,"quantity": 0}')
      this.cartList.set(cartList);
      // Making a this.cartList object from available product and cartProducts
      this.cartList.update(cartList => cartList.filter(pro => this.cartProducts.find(p => pro.id === p.productId)))

      // Appending quantity to this.cartList object
      this.cartList.update(cartList => cartList.map(product => this.cartProducts.map((cartProduct): Product | void => {
        if (product.id === cartProduct.productId) {
          return { ...product, quantity: cartProduct.quantity }
        }
      })).flatMap((element) => element.filter((ele) => ele !== undefined)))
    })

  }

  increment(product: Product) {
    product.quantity = (product.quantity || 1) + 1;
    this.productService.addItemToCart(product);
    this.cartList.update(cartList => [...cartList])
  }

  decrement(product: Product | any) {
    if (product.quantity === 1) {
      this.removeItemFromCart(product);
    } else {
      product.quantity = product.quantity - 1;
      this.cartList.update(items => items.map(item => item.id === product.id ? product : item));
      this.cartProducts = this.cartProducts.map(item => item.productId === product.id ? { ...item, quantity: product.quantity } : item);
      this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
      this.localStorage.setItem('productCart', this.cartProducts)
    }
  }

  removeItemFromCart(product: Product) {
    this.cartProducts = this.cartProducts.filter(item => item.productId !== product.id);
    this.cartList.update(items => items.filter(item => item.id !== product.id));
    this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
    this.localStorage.setItem('productCart', this.cartProducts)
  }
}
