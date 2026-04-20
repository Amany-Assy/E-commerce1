import { SearchPipe } from './../../../../shared/pipes/search-pipe';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent, SearchPipe], 
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  
  searchTerm = computed(() => this._productsService.searchTerm());

  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}