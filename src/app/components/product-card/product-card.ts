import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../../models/products';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../store/ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  // addToCartClicked = output<Product>();

  // store = inject(EcommerceStore);

  // isInWishlist = computed(() =>
  //   this.store.wishlistItems().find((item) => item.id === this.product().id),
  // );

  // toggleWishlist(product: Product) {
  //   if (this.isInWishlist()) {
  //     this.store.removeFromWishlist(product);
  //   } else {
  //     this.store.addToWishlist(product);
  //   }
  // }
}
