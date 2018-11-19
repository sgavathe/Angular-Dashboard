import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { GETSTATSService } from '../../service/getstats.service';
import {Http, Response, RequestOptions, Request, Headers,BaseRequestOptions, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from '../../service/excel.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let service: GETSTATSService;
  let excelService: ExcelService;
  let http: Http;
  let backend: MockBackend;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
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
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
     
    }).compileComponents();

     // Inject the http service and test controller for each test
     httpClient = TestBed.get(HttpClient);
     httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
