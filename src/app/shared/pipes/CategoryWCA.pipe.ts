import { Pipe, type PipeTransform } from '@angular/core';
import { Categories_WCA } from '../../core/data/Categories_WCA';

@Pipe({
  name: 'categoryWCA',
})
export class CategoryWCAPipe implements PipeTransform {

  transform(category: string): string {
    const nameCategorie = Categories_WCA.find((cat) => cat.id === category)?.name;

    return nameCategorie ?? '';
  }

}
