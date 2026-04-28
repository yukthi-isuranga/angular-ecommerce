import { Component, inject } from '@angular/core';
import { ViewPanal } from '../../../directives/view-panal';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../../store/ecommerce-store';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanal, MatIcon, MatAnchor, RouterLink],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {
  store = inject(EcommerceStore);
}
