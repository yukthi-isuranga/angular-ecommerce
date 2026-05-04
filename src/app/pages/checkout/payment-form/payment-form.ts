import { Component } from '@angular/core';
import { ViewPanal } from '../../../directives/view-panal';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanal, MatIcon, MatRadioModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {}
