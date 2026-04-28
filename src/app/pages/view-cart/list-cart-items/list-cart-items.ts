import { Component, inject } from '@angular/core';
import { ViewPanal } from '../../../directives/view-panal';
import { EcommerceStore } from '../../../store/ecommerce-store';
import { ShowCartItem } from '../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanal, ShowCartItem],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
