import { Component, OnInit,Inject, HostListener } from '@angular/core';
import { GETSTATSService } from '../../service/getstats.service';
import { SearchResults,getstatsPin, officeServiceModel } from '../../model/api.model';
import { Observable,throwError } from 'rxjs';
import { DOCUMENT } from "@angular/platform-browser";
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})
export class LayoutComponent implements OnInit {  
  tableTitle: string = 'Table Title'
  columnSettings: any[] = [];
  tableData :  Observable<any>[] = [];  

  constructor(private dataService: GETSTATSService,
      @Inject(DOCUMENT) private doc: Document) { }

  public fixed: boolean = false; 
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = document.documentElement.scrollTop;
    //console.log("scroll top" , document.documentElement.scrollTop)
    if ( num > 50 ) {
        this.fixed = true;
    }else if (this.fixed && num < 5) {
        this.fixed = false;
    }
  }


  ngOnInit() {    
    let that = this;
    that.dataService.getOfficeData().subscribe(data => {      
      this.tableData.push(data["features"]);     
      //console.log(this.tableData);
      that.columnSettings.push(
        [
          {
            primaryKey: 'OBJECTID',
            header: 'objectid',
            field: "data.attributes.OBJECTID"
          },
          {
            primaryKey: 'OCD',
            header: 'Office',
            field: "data.attributes.OCD"
          },
          {
            primaryKey: 'OFC_TYP',
            header: 'Type',
            field: "data.attributes.OFC_TYP"
          },
          {
            primaryKey: 'GEOCODE_ADDRESS',
            header: 'Address',
            field: "data.attributes.GEOCODE_ADDRESS"
          }
        ]);      
    }, err => {
      console.log(err);
    }); 
  }

  

}
