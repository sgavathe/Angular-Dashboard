import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapComponent } from './map.component';
import { GETSTATSService } from '../../service/getstats.service';
import {Http, Response, RequestOptions, Request, Headers,BaseRequestOptions, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../service/message.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let service: GETSTATSService;
  let messageService: MessageService;
  let http: Http;
  let backend: MockBackend;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => { 
    service = new GETSTATSService(http,httpClient);
    messageService = new MessageService();
    component = new MapComponent(service, messageService);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        GETSTATSService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        } ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
     
    }).compileComponents();

     // Inject the http service and test controller for each test
     httpClient = TestBed.get(HttpClient);
     httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    //let mapUrl = 'http://gisdev.labs.addev.ssa.gov/arcgis/rest/services/Getstats/ODAR/MapServer/3/query?where=ZIP%3D21227&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json';
    let mapUrl = 'http://gisdev.labs.addev.ssa.gov/arcgis1/'
    httpClient.get(mapUrl).subscribe( 
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
  
    const req = httpTestingController.expectOne(mapUrl);
  
    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
  
  it('should get length of the GIS Service data', () => {    
    const service = TestBed.get(GETSTATSService);
    const http = TestBed.get(HttpTestingController);
    let profileResponse;
   
    //expect(component.getSecurityData().toEqual(profileInfo));
  //   component.testService().subscribe(
  //     response => {           
  //       expect(response.length).toBe(10);
  //     },
  //     (error) => {
  //       console.log("error occured =>");
  //       //expect(error.length).toEqual(10);
  //     }
  // );  
    
});

  it('should get profile data of user', () => {
    const profileInfo = { pin: 134969 };
    const service = TestBed.get(GETSTATSService);
    const http = TestBed.get(HttpTestingController);
    let profileResponse;
  
    //expect(component.getSecurityData().toEqual(profileInfo));
  //   component.getSecurityData().subscribe(
  //   (response) => {           
  //      expect(response.pin).toEqual(1);
  //   },
  //   (error) => {
  //     console.log("error occured =>");
  //     expect(error.pin).toEqual(1);
  //   }
  // );  
    
  });
});
