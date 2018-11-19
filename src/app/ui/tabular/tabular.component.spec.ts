import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA,DebugElement } from '@angular/core';
import { By }  from '@angular/platform-browser';
import { TabularComponent } from './tabular.component';
import { FormsModule } from '@angular/forms';
import { GETSTATSService } from '../../service/getstats.service';
import {Http, Response, RequestOptions, Request, Headers,BaseRequestOptions, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from '../../service/excel.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

describe('TabularComponent', () => {
  let component: TabularComponent;
  let fixture: ComponentFixture<TabularComponent>;
  let service: GETSTATSService;
  let excelService: ExcelService;
  let http: Http;
  let backend: MockBackend;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let pipe: FilterPipe;
  let de: DebugElement;
let el: HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularComponent,FilterPipe ],
      providers: [
        GETSTATSService,
        ExcelService,       
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        } ],
      imports: [HttpClientTestingModule,NgxPaginationModule],
      schemas: [NO_ERRORS_SCHEMA]
     
    }).compileComponents();

     // Inject the http service and test controller for each test
     httpClient = TestBed.get(HttpClient);
     httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {  
    fixture = TestBed.createComponent(TabularComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });


  it('should create', () => {
    let data  = '[{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[-70.280422258999977,43.668328348000045]},"properties":{"OCD":"001","NAME":"PORTLAND ME           ","OFC_TYP":"13","OFC_TYP_TXT":"FO/1      ","GEOCODE_ADDRESS":"SOCIAL SECURITY SUITE 150 550 FOREST AVE ","GEOCODE_CITY":"PORTLAND                    ","GEOCODE_STATE":"ME","GEOCODE_ZIP":"04101","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117260000,"ADDRESS":"SOCIAL SECURITY SUITE 150 550 FOREST AVE ","CITY":"PORTLAND                    ","STATE":"ME","ZIP":"04101","SCORE":19976,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"877-393-6898","RGN_NM":"BOSTON                ","ADONUM":"03","PRNT_OCD":"001","FEI":"YES","VIDEO":"YES","rn":5.0274052963186382e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":1,"ESRI_OID":1}},{"type":"Feature","id":2,"geometry":{"type":"Point","coordinates":[-68.773302428999955,44.804837570000075]},"properties":{"OCD":"002","NAME":"BANGOR ME             ","OFC_TYP":"13","OFC_TYP_TXT":"FO/1      ","GEOCODE_ADDRESS":"SOCIAL SECURITY ROOM 10307 202 HARLOW ST ","GEOCODE_CITY":"BANGOR                      ","GEOCODE_STATE":"ME","GEOCODE_ZIP":"04401","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117260000,"ADDRESS":"SOCIAL SECURITY ROOM 10307 202 HARLOW ST ","CITY":"BANGOR                      ","STATE":"ME","ZIP":"04401","SCORE":20520,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"877-405-4552","RGN_NM":"BOSTON                ","ADONUM":"03","PRNT_OCD":"002","FEI":"YES","VIDEO":"NO","rn":5.0274052944214261e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":2,"ESRI_OID":2}},{"type":"Feature","id":3,"geometry":{"type":"Point","coordinates":[-69.797198545999947,44.352037921000033]},"properties":{"OCD":"003","NAME":"AUGUSTA ME            ","OFC_TYP":"13","OFC_TYP_TXT":"FO/1      ","GEOCODE_ADDRESS":"SOCIAL SECURITY SUITE 4 330 CIVIC CENTER DR ","GEOCODE_CITY":"AUGUSTA                     ","GEOCODE_STATE":"ME","GEOCODE_ZIP":"04330","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117261000,"ADDRESS":"SOCIAL SECURITY SUITE 4 330 CIVIC CENTER DR ","CITY":"AUGUSTA                     ","STATE":"ME","ZIP":"04330","SCORE":20296,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"866-887-5119","RGN_NM":"BOSTON                ","ADONUM":"03","PRNT_OCD":"003","FEI":"YES","VIDEO":"NO","rn":5.0274052896783959e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":3,"ESRI_OID":3}},{"type":"Feature","id":4,"geometry":{"type":"Point","coordinates":[-70.232011753999984,44.117269905000057]},"properties":{"OCD":"004","NAME":"AUBURN ME             ","OFC_TYP":"01","OFC_TYP_TXT":"FO/2      ","GEOCODE_ADDRESS":"SOCIAL SECURITY SUITE 5 600 TURNER STREET ","GEOCODE_CITY":"AUBURN                      ","GEOCODE_STATE":"ME","GEOCODE_ZIP":"04210","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117261000,"ADDRESS":"SOCIAL SECURITY SUITE 5 600 TURNER STREET ","CITY":"AUBURN                      ","STATE":"ME","ZIP":"04210","SCORE":20616,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"877-405-9802","RGN_NM":"BOSTON                ","ADONUM":"03","PRNT_OCD":"001","FEI":"YES","VIDEO":"YES","rn":5.027405291417507e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":4,"ESRI_OID":4}},{"type":"Feature","id":5,"geometry":{"type":"Point","coordinates":[-68.015758517999984,46.67933044800003]},"properties":{"OCD":"005","NAME":"PRESQUE ISLE ME       ","OFC_TYP":"01","OFC_TYP_TXT":"FO/2      ","GEOCODE_ADDRESS":"SOCIAL SECURITY  365 MAIN ST ","GEOCODE_CITY":"PRESQUE ISLE                ","GEOCODE_STATE":"ME","GEOCODE_ZIP":"04769","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117261000,"ADDRESS":"SOCIAL SECURITY  365 MAIN ST ","CITY":"PRESQUE ISLE                ","STATE":"ME","ZIP":"04769","SCORE":20168,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"866-873-6428","RGN_NM":"BOSTON                ","ADONUM":"03","PRNT_OCD":"002","FEI":"YES","VIDEO":"YES","rn":5.0274052901526989e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":5,"ESRI_OID":5}},{"type":"Feature","id":6,"geometry":{"type":"Point","coordinates":[-80.158899184999939,41.623422939000079]},"properties":{"OCD":"007","NAME":"MEADVILLE PA          ","OFC_TYP":"01","OFC_TYP_TXT":"FO/2      ","GEOCODE_ADDRESS":"SOCIAL SECURITY  19063 PARK AVE PLAZA ","GEOCODE_CITY":"MEADVILLE                   ","GEOCODE_STATE":"PA","GEOCODE_ZIP":"16335","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117261000,"ADDRESS":"SOCIAL SECURITY  19063 PARK AVE PLAZA ","CITY":"MEADVILLE                   ","STATE":"PA","ZIP":"16335","SCORE":20072,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"888-347-9291","RGN_NM":"PHILADELPHIA          ","ADONUM":"04","PRNT_OCD":"205","FEI":"YES","VIDEO":"NO","rn":5.0274052960024361e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":7,"ESRI_OID":6}},{"type":"Feature","id":7,"geometry":{"type":"Point","coordinates":[-75.173471541999959,39.908766564000075]},"properties":{"OCD":"009","NAME":"PHILA SOUTH PA        ","OFC_TYP":"01","OFC_TYP_TXT":"FO/2      ","GEOCODE_ADDRESS":"SOCIAL SECURITY STADIUM PLAZA 3336 S BROAD STREET ","GEOCODE_CITY":"PHILADELPHIA                ","GEOCODE_STATE":"PA","GEOCODE_ZIP":"19145","OPEN_DATE":-1048204800000,"CLOSE_DATE":null,"PROCESS_DATE":1541117261000,"ADDRESS":"SOCIAL SECURITY STADIUM PLAZA 3336 S BROAD STREET ","CITY":"PHILADELPHIA                ","STATE":"PA","ZIP":"19145","SCORE":20104,"EFFECTIVE_START_DATE":1442016000000,"EFFECTIVE_END_DATE":253402214400000,"FORMATTED_ADDRESS":null,"PHONE":"877-699-0262","RGN_NM":"PHILADELPHIA          ","ADONUM":"01","PRNT_OCD":"200","FEI":"YES","VIDEO":"NO","rn":5.0274052879392848e-312,"description":"FRONT END INTERVIEWING                            ","OBJECTID":9,"ESRI_OID":7}}]';
    let dataObj = JSON.parse(data);    
    setTimeout( function() {           
      component.tableData.push(data);    
      console.log(data);
    }, 2000);
    
    // service.getOfficeData().subscribe(data => {      
    //  component.tableData.push(data["features"]);     
    // }, err => {
    //   console.log(err);
    // }); 
    component.tableTitle = 'Table Title';
    component.columnSettings.push(
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
    expect(component).toBeTruthy();
  });

  // it('should display original title', () => {
  //   fixture.detectChanges();
  //   expect(el.textContent).toContain('GETSTATS');
  // });
  it('should call onClick method', () => {
    const onClickMock = spyOn(component, 'exportAsXLSX');
    let de = fixture.debugElement.query(By.css('#exportAsXLSX'));
    de.triggerEventHandler('click', null);
    //expect(onClickMock).toHaveBeenCalled();
    console.log(de);
    //tick(); // simulates the passage of time until all pending asynchronous activities finish
    //fixture.detectChanges();
    expect(onClickMock).toHaveBeenCalled();
  });

  
});
