import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-slider',
  imports: [RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {

 
}
