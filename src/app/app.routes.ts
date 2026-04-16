import { SpesificCategoryComponent } from './feacheres/spesific-category/spesific-category.component';
import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feacheres/home/home.component').then(m => m.HomeComponent),
    title: 'home page'
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./feacheres/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./feacheres/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./feacheres/brands/brands.component').then(m => m.BrandsComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./feacheres/wishlist/wishlist.component').then(m => m.WishlistComponent),
    canActivate:[authGuard]
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./feacheres/cart/cart.component').then(m => m.CartComponent),
    canActivate:[authGuard]
  },
  {
    path: 'details/:id/:slug',
    loadComponent: () =>
      import('./feacheres/details/details.component').then(m => m.DetailsComponent)
  },
   {
  path: 'spesificCategory/:id/:slug',
  loadComponent: () =>
import('./feacheres/spesific-category/spesific-category.component').then(m => m.SpesificCategoryComponent)},
  {
    path: 'spesificbrand/:id/:slug',
    loadComponent: () =>
      import('./feacheres/spesificbrand/spesificbrand.component').then(m => m.SpesificbrandComponent)
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./feacheres/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate:[authGuard]
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./feacheres/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feacheres/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./feacheres/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forget',
    loadComponent: () =>
      import('./feacheres/forget/forget.component').then(m => m.ForgetComponent)
  },
 {
  path: 'catdetails/:id/:slug',
  loadComponent: () =>
    import('./feacheres/catdetails/catdetails.component')
      .then(m => m.CatdetailsComponent)
},
  {
    path: '**',
    loadComponent: () =>
      import('./feacheres/notfound/notfound.component').then(m => m.NotfoundComponent)
  }
];
