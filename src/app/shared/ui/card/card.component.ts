import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/auth/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit{
   private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService);
    public readonly wishlistService = inject(WishlistService);


  product= input.required<Product>();
  wishlistIds: string[] = [];

ngOnInit() {
}


   addProductToCart(id:string):void{

    if(localStorage.getItem('freshToken')){
      this.cartService.addToCart(id).subscribe({
next:(res)=>{
  console.log(res);

  if(res.status === 'success'){
      this.cartService.cartCount.set(res.numOfCartItems);
      this.toastrService.clear();
      this.toastrService.success(res.message , 'Fresh Cart' , {progressBar:true ,closeButton:true });

  }
},
    });
  }
  else{

    this.toastrService.clear();
    this.toastrService.warning('please, login first' , 'Fresh Cart' , {progressBar:true ,closeButton:true })
  }
    }

isInWishlist(productId: string): boolean {
  return this.wishlistIds.includes(productId);
}

getWishlist() {
  const token = localStorage.getItem('freshToken');
  if (!token) return;

  this.wishlistService.getWishList().subscribe({
    next: (res: any) => {
      if (res?.data) {
        this.wishlistIds = res.data.map((item: any) => item.id || item._id);
        
        this.wishlistService.wishlistIds.set(this.wishlistIds);
      }
    },
    error: (err) => {
      console.error('Error fetching wishlist:', err);
      this.wishlistIds = [];
    }
  });
}


toggleWishList(id: string): void {
  const isInWishlist = this.wishlistService.wishlistIds().includes(id);

  if (isInWishlist) {
    this.wishlistService.removeFromWishList(id).subscribe({
      next: (res) => {
        console.log('Deleted successfully', res);
        this.wishlistService.wishlistIds.set(res.data); 
        this.toastrService.warning(res.message);
      }
    });
  } else {
    this.wishlistService.addToWishList(id).subscribe({
      next: (res) => {
        console.log('Added successfully', res);
        this.wishlistService.wishlistIds.set(res.data); 
        this.toastrService.success(res.message);
      }
    });
  }
}

}