import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../store/ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
