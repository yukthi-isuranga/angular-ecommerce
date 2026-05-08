import { Component, computed, input } from '@angular/core';
import { UserReview } from '../../../../models/user-review';
import { ViewPanal } from '../../../directives/view-panal';
import { StarRating } from '../../../components/star-rating/star-rating';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanal, StarRating, DatePipe],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
