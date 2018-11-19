import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable,throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { SearchResults,getstatsPin, officeServiceModel } from '../../app/model/api.model';

import {Http, Response, RequestOptions, Request, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GETSTATSService {
  results: any;
  userpins: any;
  testurl: string;

  constructor(private http : Http, private httpclient: HttpClient) {     
  }

  
  getHeader = () => {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');
    return headers;
  };

  request = (req) => {
      let baseUrl = '',
          requestOptions = new RequestOptions({
          method: req.method,
          url: req.url,
          headers: req.header ? req.header : this.getHeader(),
          body: JSON.stringify(req.params)
      });

      return this.http.request(new Request(requestOptions))
                      .pipe(map((res:Response) => res.json()));
  };


 public makeHttpRequest(url: string): Observable<getstatsPin> {    
          return this.httpclient
          .get<getstatsPin>(url)
          //.do(data => console.log('All : ' + JSON.stringify(data)))
          .catch(this.handleError);     
  }

  public getOfficeData(): Observable<officeServiceModel>{
        var localdataurl = './data/offices.json';  
        return this.httpclient
        .get<officeServiceModel>(localdataurl)
        //.do(data =>console.log('All : ' + JSON.stringify(data)))
        .catch(this.handleError);      
     
  }

  public getMapData(url: string): Observable<officeServiceModel>{
    return this.httpclient
    .get<officeServiceModel>(url)
    //.do(data =>console.log('All : ' + JSON.stringify(data)))
    .catch(this.handleError);       
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  
}
