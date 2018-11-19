import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, field: string, field1: string): any[] {
    if (!items) {
        return [];
    }
    if (!field || !value) {
        return items;
    }
    let filteredData = items.filter(obj => obj.attributes[field].toLowerCase().includes(value.toLowerCase()));
    if (field1) {
        filteredData = filteredData.concat(items.filter(obj => obj.attributes[field1].toLowerCase().includes(value.toLowerCase())));
    }
    return filteredData;
  }

}
