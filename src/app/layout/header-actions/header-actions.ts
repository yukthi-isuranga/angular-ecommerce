import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { EcommerceStore } from '../../store/ecommerce-store';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-header-actions',
  imports: [MatIcon, MatButtonModule, RouterLink, MatBadgeModule, MatMenuModule, MatDrawer],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
