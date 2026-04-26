import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-grid/product-grid').then((m) => m.ProductGrid),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist').then((m) => m.MyWishlist),
  },
];
