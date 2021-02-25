import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('getPlanets should make a request and get results', () => {
    // arrange
    const planets = { name: 'Mars' };

    // act
    service.getPlanets().subscribe((planets) => {
      expect(planets).toEqual(planets);
    });

    // assert
    const req = httpMock.expectOne(`${environment.apiUrl}/planets`);
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
    expect(service).toBeTruthy();
  });
});
