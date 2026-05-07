import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../../models/products';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { MatAnchor } from '@angular/material/button';
import { EcommerceStore } from '../../../store/ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, MatAnchor, MatIcon, ToggleWishlistButton],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  store = inject(EcommerceStore);

  product = input.required<Product>();

  quantity = signal<number>(1);
}
