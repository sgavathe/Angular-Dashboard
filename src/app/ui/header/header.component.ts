import { Component, OnInit } from '@angular/core';
import { GETSTATSService } from '../../service/getstats.service';
import { MessageService } from '../../service/message.service';
import {getstatsPin } from '../../model/api.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserName: string;
  public toggleMenu: any;
  constructor(private dataService:GETSTATSService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.toggleMenu = function(e){
      //e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $("main").toggleClass("active");
    }
    setTimeout(() => {
      console.log("loading username");
      this.getUserName();
      this.getdata();
    }, 500);      
  }

   private getUserName(): any{
    let url = "http://development.ba.ad.ssa.gov/getstats/QueryController.ashx?getUserPin=yes";
    this.dataService.makeHttpRequest(url).subscribe(data => {
        this.currentUserName = data.pin;
      }, err => {
        console.log(err);
      }); 
      
   }

   private getdata(): any {
      let url = "http://development.ba.ad.ssa.gov/getstats/QueryController.ashx";
      let getdataString = '{"name":"getComponentList","Parameters":{"COMPONENT_LEVEL":"REGION","PARENT_COMPONENT_LEVEL":"","PARENT_COMPONENT_ID":"","RGN_NM":""},"FunctionName":"NavigationWidget"}'  ;
      // this.dataService.makePostRequest(url,getdataString).subscribe(data => {
      //   //console.log(data);
      //   this.messageService.fetchResults(data, 'regions');
      // }, err => {
      //   console.log("error" + err);
      // }); 
 
   }
}

