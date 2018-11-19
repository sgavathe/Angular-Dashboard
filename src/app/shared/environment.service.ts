import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  getAPIUrl(userMockAPI?: boolean): string{
    if(userMockAPI){
      return environment.mockAPIUrl;
    };
    return environment.APIUrl;
  }
}
