import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/auth/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  public readonly wishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
private readonly _ToastrService = inject(ToastrService);
  wishlistData: any[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
 this.wishlistService.getWishList().subscribe({
    next: (res) => {
      console.log('البيانات كاملة:', res.data);
      setTimeout(() => {
        this.wishlistData = res.data;
      }, 0);
    }
  });
}

  removeItem(id: string): void {
    this.wishlistService.removeFromWishList(id).subscribe({
      next: (res) => {
        this.wishlistData = this.wishlistData.filter(item => item.id !== id);
        this.wishlistService.wishlistIds.set(res.data);
      }
    });
  }







  addToCart(id: string): void {
  this._CartService.addToCart(id).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this._CartService.cartCount.set(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Fresh Cart');
      }
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
