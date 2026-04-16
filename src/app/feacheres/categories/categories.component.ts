import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../cart/models/cart.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService);

 categories = signal<Category[]>([]);

 ngOnInit(): void {
   this.getCategories();
 }

 getCategories():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categories.set(res.data);
    }
  })
 }
}
