import { Component } from '@angular/core';
import { ViewPanal } from '../../../directives/view-panal';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanal, MatIcon, MatFormFieldModule, MatInput, MatLabel, MatFormField],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {}
