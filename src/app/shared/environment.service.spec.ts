import { TestBed, inject } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService]
    });
  });

  it('should be created', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service).toBeTruthy();
  }));
  describe('getApiUrl', () => {

    it('should return api url',
      inject([EnvironmentService], (service: EnvironmentService) => {

        const apiUrl = service.getAPIUrl();
        console.log(environment.APIUrl);
        expect(apiUrl).toEqual(environment.APIUrl);
      }));

    it('should return mock api url when passed true',
      inject([EnvironmentService], (service: EnvironmentService) => {

        const apiUrl = service.getAPIUrl(true);
        expect(apiUrl).toEqual(environment.mockAPIUrl);
      }));
  });
});
