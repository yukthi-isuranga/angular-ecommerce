import { Component, inject, input } from '@angular/core';
import { EcommerceStore } from '../../store/ecommerce-store';

@Component({
  selector: 'app-view-product-detail',
  imports: [],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss',
})
export default class ViewProductDetail {
  store = inject(EcommerceStore);

  productId = input.required<string>();

  constructor() {
    this.store.setProductId(this.productId);
  }
}
