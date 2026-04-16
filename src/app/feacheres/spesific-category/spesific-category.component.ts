import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../cart/models/cart.interface';

@Component({
  selector: 'app-spesific-category',
  standalone: true,
  imports: [],
  templateUrl: './spesific-category.component.html',
  styleUrl: './spesific-category.component.css',
})
export class SpesificCategoryComponent {
  private readonly categoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subCategories = signal<Category[]>([]);
  specificCategory = signal<Category | null>(null);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getCategoryHeaderData(id);      
        this.getSpecificSubCategories(id);   
      }
    });
  }

  getCategoryHeaderData(id: string): void {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.specificCategory.set(res.data);
      }
    });
  }

  getSpecificSubCategories(id: string): void {
    this.categoriesService.getSpecificSubCat(id).subscribe({
      next: (res) => {
        this.subCategories.set(res.data);
      },
      error: (err) => console.error('Error fetching subcategories:', err)
    });
  }
}