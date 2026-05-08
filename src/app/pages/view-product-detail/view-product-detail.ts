import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../store/ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss',
})
export default class ViewProductDetail {
  store = inject(EcommerceStore);

  productId = input.required<string>();

  constructor() {
    this.store.setProductId(this.productId);
  }

  backRoute = computed(() => `/products/${this.store.category()}`);
}
