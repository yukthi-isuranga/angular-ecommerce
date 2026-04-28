import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './qty-selector.html',
  styleUrl: './qty-selector.scss',
})
export class QtySelector {
  quantity = input(0);
  qtyUpdated = output<number>();
}
