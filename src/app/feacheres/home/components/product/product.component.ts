import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { log } from 'console';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../../core/auth/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { WishlistService } from '../../../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  imports: [ CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit{
  private readonly productsService = inject(ProductsService);
     private readonly toastrService = inject(ToastrService);


  productList= signal<Product[]>([]);
  


  ngOnInit(): void {
    this.getProductsData();
  }


  getProductsData():void{
this.productsService.getAllProducts().subscribe({
  next:(res)=>{
    console.log(res);
    this.productList.set(res.data);
  },
  error:(err)=>{
    console.log(err);
  }
})
  }

 
    

}
