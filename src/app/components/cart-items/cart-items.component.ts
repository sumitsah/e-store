import { Component, computed, effect, inject, OnInit, signal, untracked, WritableSignal } from '@angular/core';
import { Product, ProductCartDetails } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'store-cart-items',
  imports: [],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit {
  cartList = signal<Product[] | ProductCartDetails[] | any[]>([]);
  cartProducts: ProductCartDetails[] = [];
  price = signal<number[]>([]);
  quantity = signal<number[]>([]);

  originalPrice = computed(() =>
    Math.round(this.cartList().reduce((acc, curr) => {
      return (acc = (curr.price * curr.quantity) + acc);
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
      })))

      this.cartList.update(cartList => cartList.flatMap((element) => element.filter((ele: ProductCartDetails) => ele !== undefined)))
    })

  }

  increment(product: Product | ProductCartDetails | any) {
    product.quantity = (product.quantity || 1) + 1;
    this.productService.addItemToCart(product);
    this.cartList.update(cartList => [...cartList])
  }

  decrement(product: Product | any) {
    product.quantity = product.quantity - 1;
    let index;
    // Mutating the actual object using find, need to find a better way to perform this operation.
    this.cartProducts.find((cartItem, i) => {
      if (cartItem.productId === product.id) {
        if (cartItem.quantity == 1) {
          index = i
        } else {
          cartItem.quantity--;
        }
      }
    })
    if (!index) {
      this.cartList.update(items => items.map(item => item.id === product.id ? product : item));
    }
    this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
    this.localStorage.setItem('productCart', this.cartProducts)
    index !== undefined ? this.removeItemAndUpdateState(index) : ''
  }

  removeItemFromCart(product: Product) {
    this.cartProducts = this.cartProducts.filter(item => item.productId !== product.id);
    this.cartList.update(items => items.filter(item => item.id !== product.id));
    this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
    this.localStorage.setItem('productCart', this.cartProducts)
  }

  removeItemAndUpdateState(index: number) {
    this.cartProducts.splice(index, 1);
    this.cartList.update(cartList => {
      cartList.splice(index, 1);
      return [...cartList];
    })
    this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => acc = curr.quantity + acc, 0));
    this.localStorage.setItem('productCart', this.cartProducts)
  }
}
