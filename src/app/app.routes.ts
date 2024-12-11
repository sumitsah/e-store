import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './guards/auth.guard';
import { CartItemsComponent } from './components/cart-items/cart-items.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
    { path: 'cart-items', component: CartItemsComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
