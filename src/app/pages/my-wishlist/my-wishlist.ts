import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../store/ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatButtonModule, MatIcon, EmptyWishlist],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
