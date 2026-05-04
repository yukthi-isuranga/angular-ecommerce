import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { PaymentForm } from './payment-form/payment-form';
import { ShippingForm } from './shipping-form/shipping-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { EcommerceStore } from '../../store/ecommerce-store';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, PaymentForm, ShippingForm, SummarizeOrder, MatAnchor],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {
  store = inject(EcommerceStore);
}
