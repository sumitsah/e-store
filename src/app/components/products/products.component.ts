import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';
import { Product, ProductCart, ProductCartDetails } from '../../model/product';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'store-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  // productList!: WritableSignal<Product[]>;
  cartProducts!: ProductCartDetails[];

  productService = inject(ProductService);
  localStorage = inject(LocalStorageService);

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      // this.productList = signal(this.products);
    })

    // this.productService.getProductCart().subscribe(console.log);
  }

  addItemToCart(product: Product) {
    this.productService.addItemToCart(product)
  }
}
