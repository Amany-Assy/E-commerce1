import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
 transform(products: any[], term: string): any[] {
    if (!products || !term) return products;
    
    return products.filter(p => 
      p.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
