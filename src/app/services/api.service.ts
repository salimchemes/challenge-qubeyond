import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlanet } from '../models/planet';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getPlanets(): Observable<IPlanet[]> {
    return this.httpClient
      .get(`${this.apiUrl}/planets`)
      .pipe(map((response: any) => response.results)) as Observable<IPlanet[]>;
  }
}
