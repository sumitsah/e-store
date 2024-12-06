import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'store-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productList!: WritableSignal<Product[]>;

  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.productList = signal(this.products);
      console.log(this.products)
    })
  }
}
