import { Component, input } from '@angular/core';
import { Product } from '../../../../models/products';
import { ViewPanal } from '../../../directives/view-panal';
import { RatingSummary } from '../rating-summary/rating-summary';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanal, RatingSummary],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  product = input.required<Product>();
}
