import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  getWishList2(): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`);
}

 addToWishList(id: string): Observable<any> {
   return this.httpClient.post(environment.baseUrl + `/api/v1/wishlist`, 
    { "productId": id }, 
    { headers: { "token": localStorage.getItem('freshToken') || '' } }
  );
  }
  

   removeFromWishList(productId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/wishlist/${productId}`);
  }


wishlistIds = signal<string[]>([]); 

getWishList(): Observable<any> {
  return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`, {
    headers: { token: localStorage.getItem('freshToken') || '' }
  }).pipe(
    tap((res: any) => {
      const ids = res.data.map((item: any) => item.id || item._id);
      this.wishlistIds.set(ids); 
    })
  );
}

}
