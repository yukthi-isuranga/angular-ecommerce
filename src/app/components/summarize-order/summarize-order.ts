import { Component, computed, inject } from '@angular/core';
import { ViewPanal } from '../../directives/view-panal';
import { EcommerceStore } from '../../store/ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanal],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() =>
    this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  );

  tax = computed(() => 0.05 * this.subtotal());

  total = computed(() => this.subtotal() - this.tax());
}
