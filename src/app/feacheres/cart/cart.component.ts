import { CartService } from './../../core/auth/services/cart.service';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Cart } from './models/cart.interface';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly CartService = inject(CartService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  cartDetails= signal<Cart>({} as Cart);

  ngOnInit(): void {
    if(isPlatformBrowser(this.pLATFORM_ID)){
     this.getCartData();
 
    }
  }

  getCartData():void{
    this.CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails.set(res.data);
      }
    })
  }

  removeItem(id:string):void{
    this.CartService.removeProductCart(id).subscribe({
      next:(res)=>{
        console.log(res);
          this.CartService.cartCount.set(res.numOfCartItems);

         this.cartDetails.set(res.data);
      }

    })
  }

  upDate(id:string , count:number):void{
   this.CartService.updateCartCount(id , count).subscribe({
    next:(res)=>{
      console.log(res);
       this.cartDetails.set(res.data);
    }
   })
  }

  clearitems():void{
    this.CartService.clearAll().subscribe({
      next:(res)=>{
        console.log(res);
          this.CartService.cartCount.set(res.numOfCartItems);

         this.cartDetails.set(res.data);
      }
    })
  }
}
