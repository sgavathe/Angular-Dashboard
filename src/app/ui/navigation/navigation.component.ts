import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageService } from '../../service/message.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  selectedCity = null;  
  selectedRegion = null;  
  selectedArea = null;  
  selectedDistrict = null;  
  selectedOCD = null;  
  selectedZip = null;  

  regionsList = [];
  ocdPolyList = [];
  onChange : any;

  constructor(private messageService: MessageService) { }

    ngOnInit() {
      this.messageService.regions.subscribe(
        data => {
          this.regionsList.push(data);  
          console.log(this.regionsList[0]);
        }         
      );  

      this.messageService.ocds.subscribe(
        data => {
          this.ocdPolyList.push(data.map((i) => { i.OCDNAME = i.OCD + '-' + i.NAME; return i; }));  
          console.log(this.ocdPolyList);
        }         
      );  

      this.onChange =  function(item){
        console.log(item);
        this.messageService.sendMessage(item.OCD, 'ocdPolygon');
      }
  

    }

    
}
