import { async,fakeAsync, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GETSTATSService } from './getstats.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Http, Response, RequestOptions, Request, Headers,BaseRequestOptions, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpRequest,HttpBackend  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe('GETSTATSService', () => {
  let service: GETSTATSService;
  let http: Http;
  let backend: HttpBackend;
  let mockBackend: MockBackend;
  let httpclient: HttpClient;
  let httpMock: HttpTestingController;
  const profileInfo = undefined;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        GETSTATSService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, HttpClient,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        } ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
     
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    service = new GETSTATSService(http,httpclient);   
    mockBackend = getTestBed().get(MockBackend);   
  }));
 
  beforeEach(() => { 
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([GETSTATSService], (service: GETSTATSService) => {
    expect(service).toBeTruthy();
  }));

  it('should get data', () => {
    
    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    id: 26,
                    contentRendered: '<p><b>Hi there</b></p>',
                    contentMarkdown: '*Hi there*'
                  }]
              }
            )));
        });

        service = getTestBed().get(GETSTATSService);
        expect(service).toBeDefined();
        let url = "http://development.ba.ad.ssa.gov/getstats/QueryController.ashx?getUserPin=yes";
        service.makeHttpRequest(url).subscribe((getstatsPin) => {
            expect(getstatsPin).toBeDefined();
            // expect(blogs.length).toEqual(1);
            // expect(blogs[0].id).toEqual(26);
            //done();
        });
    });
  });

  // it('should mock http request', (done) => {
  //   const githubService = TestBed.get(GETSTATSService);
  //   const backend = TestBed.get(HttpTestingController);
  //   let profileResponse;
   
  //   let url = "http://development.ba.ad.ssa.gov/getstats/QueryController.ashx?getUserPin=yes";
  //   //githubService.expectOne(url);
  //   githubService.makeHttpRequest(url).subscribe((response) => {                 
  //     profileResponse = response;    
  //     setTimeout(function () {
  //       console.log('inside timeout');
  //       expect(profileResponse).toEqual(profileInfo);
  //       //done();
  //       }, 1000);
  //   }); 

  //    // Pass a function to the expectOne method
  //    const req = httpMock.expectOne(url);
  //    expect(profileResponse).toEqual(profileInfo);
    
  // });
  
});
