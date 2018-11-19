import { Component, ChangeDetectorRef, OnInit, OnChanges, ViewChildren, QueryList, ElementRef, HostListener, Input,SimpleChanges   } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { FilterPipe } from '../../pipes/filter.pipe';
import { MessageService } from '../../service/message.service';
import { ExcelService } from '../../service/excel.service';
//import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
//https://github.com/sgavathe/search-sort-pagination-angular2/blob/master/src/app/app.component.html
export class TabularComponent implements OnInit {
  @Input()   tableData :  any[] = [];    
  @Input() tableTitle: string = 'Table Title';
  @Input() columnSettings:  any[] = [];
  mapData:  any[] = []; 
  p: number = 1;
  searchText: string;
  private sorted = false; 
  order: string = 'data.attributes.OBJECTID';

  constructor(private el: ElementRef, 
              private messageService: MessageService,
              private excelService: ExcelService,
            ) { 
    //, private ref: ChangeDetectorRef
  }

  private clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
  }

  private zoomtomap(id: string){
    this.messageService.sendMessage(id, 'ocdpoints');
  }

  ngOnInit() { 
    this.messageService.importedResults.subscribe(
      data => {
        this.mapData.push(data); 
        //console.log(this.mapData[0])
      }         
    );  
  }

  exportAsXLSX(): void{
    console.log('button clicked');   
    this.excelService.exportAsExcelFile(this.mapData[0] , 'table title');
  }

  sortBy(by: string | any): void {

    this.tableData[0].sort((a: any, b: any) => {
      if (a.attributes[by] < b.attributes[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a.attributes[by] > b.attributes[by]) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });

    this.sorted = !this.sorted;
  }
  
  filterIt(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  search() {
    if (!this.searchText) {
      return this.tableData;
    }
    if (this.searchText) {
      return this.filterIt(this.tableData, this.searchText);
    }
  }


ngOnChanges(changes : any) {
    if (changes['tableData'] && this.tableData) {
      console.log("data changed");     
    }
  }
}
