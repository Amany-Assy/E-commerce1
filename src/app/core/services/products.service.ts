import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  searchTerm = signal<string>('');
  getAllProducts(pageNum:number=1):Observable<any>{
return this.httpClient.get(environment.baseUrl + `/api/v1/products?page=${pageNum}`);
  }


  getSpecificProduct(productId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }
}
