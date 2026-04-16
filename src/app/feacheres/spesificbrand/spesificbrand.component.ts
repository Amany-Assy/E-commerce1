import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/models/brands.interface';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../cart/models/cart.interface';

@Component({
  selector: 'app-spesificbrand',
  imports: [],
  templateUrl: './spesificbrand.component.html',
  styleUrl: './spesificbrand.component.css',
})
export class SpesificbrandComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  subBrands = signal<Brands | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let brandId = params.get('id');
        if (brandId) {
          this.getSpsecificBrands(brandId);
        }
      }
    });
  }

  getSpsecificBrands(id: string): void {
  this.brandsService.getSpecificBrand(id).subscribe({
    next: (res) => {
      this.subBrands.set(res.data); // وضع الكائن الواحد داخل الـ signal
    }
  });
}
}
