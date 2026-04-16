import { ActivatedRoute } from '@angular/router';
import { Category, SubCategory } from '../cart/models/cart.interface';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-catdetails',
  imports: [],
  templateUrl: './catdetails.component.html',
  styleUrl: './catdetails.component.css',
})
export class CatdetailsComponent implements OnInit{
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
