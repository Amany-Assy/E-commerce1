import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { platformBrowser } from '@angular/platform-browser';
import { CartService } from '../../core/auth/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly productsService = inject(ProductsService);
  
 

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.productsService.searchTerm.set(input.value);
  }

  logged = computed(()=>this.authService.isLogged()) ;

  count = computed(()=> this.cartService.cartCount());

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    
    if(isPlatformBrowser(this.pLATFORM_ID)){

      this.getCartCount();


       if(localStorage.getItem('freshToken')){
      this.authService.isLogged.set(true);
    }
   
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }


  }

  logOut():void{
    this.authService.signOut();
  }

  getCartCount():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }

}
