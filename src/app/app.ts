import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { WishlistService } from './core/services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NavbarComponent , FooterComponent , NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}

