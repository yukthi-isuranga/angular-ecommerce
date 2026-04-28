import { Component, computed, inject, input } from '@angular/core';
import { CartItems } from '../../../../models/cart';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../../store/ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatButtonModule],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<CartItems>();
  store = inject(EcommerceStore);

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
