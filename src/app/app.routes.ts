import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
