import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../store/ecommerce-store';
import { Product } from '../../../models/products';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() =>
    this.store.wishlistItems().find((item) => item.id === this.product().id),
  );

  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
