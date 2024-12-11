import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ProductCartDetails } from '../../model/product';

@Component({
  selector: 'store-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authService = inject(AuthService);
  productService = inject(ProductService);
  router = inject(Router);
  isAuthenticated!: boolean;
  productCount$!: Observable<number>;
  productCount!: number;
  cartProducts!: ProductCartDetails[];


  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
    // this.productCount$ = this.productService.productCount;
    this.cartProducts = JSON.parse(localStorage.getItem('productCart') || '[{"productId": 0,"quantity": 0}]')

    this.productService.productCount.next(this.cartProducts.reduce((acc, curr) => {
      return acc = curr.quantity + acc
    }, 0));
    this.productService.productCount.subscribe(c => this.productCount = c);
  }

  onLogOut() {
    this.authService.doLogout();
    this.router.navigate(["login"]);
  }
}
