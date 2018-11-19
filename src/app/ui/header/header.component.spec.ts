import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { GETSTATSService } from '../../service/getstats.service';
import {Http, Response, RequestOptions, Request, Headers,BaseRequestOptions, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: GETSTATSService;
  let http: Http;
  let backend: MockBackend;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get profile data of user', () => {
      const profileInfo = { pin: 134969 };
      const service = TestBed.get(GETSTATSService);
      const http = TestBed.get(HttpTestingController);
      let profileResponse;
    
      //expect(component.getSecurityData().toEqual(profileInfo));
    //   component.getSecurityData().subscribe(
    //   (response) => {           
    //     expect(response.pin).toEqual(0);
    //   },
    //   (error) => {
    //     console.log("error occured =>");
    //     expect(error.pin).toEqual(1);
    //   }
    // );  
      
  });

});


