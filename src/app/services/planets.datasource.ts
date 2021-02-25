import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IPlanet } from '../models/planet';
import { ApiService } from './api.service';

export class PlanetsDataSource implements DataSource<IPlanet> {
  private planetSubject = new BehaviorSubject<IPlanet[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public planets$ = this.planetSubject.asObservable();
  private planets: [] = [];

  constructor(private apiService: ApiService) {}

  loadPlanets() {
    this.loadingSubject.next(true);

    this.apiService
      .getPlanets()
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((planets: any) => {
        this.planets = planets;
        this.planetSubject.next(planets);
      });
  }

  sortPlanets(sortType: string, sortOrder: string) {
    // notes: ideally, the API should support pagination, sorting and searching. It only does support search.
    // For simplicity I have implemented sortPlanets and searchPlanets in the FE. Once having BE supporting these features,
    // loadPlanet() should be the responsible.
    let sortedPlanets: [] = [];
    if (this.isNumericSort(sortType)) {
      sortedPlanets =
        sortOrder === 'asc'
          ? this.planets.sort((a, b) => a[sortType] - b[sortType])
          : this.planets.sort((a, b) => b[sortType] - a[sortType]);
    } else {
      sortedPlanets =
        sortOrder === 'asc'
          ? this.planets.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1))
          : this.planets.sort((a, b) => (a[sortType] < b[sortType] ? 1 : -1));
    }

    this.planetSubject.next(sortedPlanets);
  }

  searchPlanets(searchTerm: string) {
    // notes: ideally, the API should support pagination, sorting and searching. It only does support search.
    // For simplicity I have implemented sortPlanets and searchPlanets in the FE. Once having BE supporting these features,
    // loadPlanet() should be the responsible.
    const filteredPlanets = this.planets.filter((planet: IPlanet) =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.planetSubject.next(filteredPlanets);
  }

  private isNumericSort(sortType: string) {
    return (
      sortType === 'population' ||
      sortType === 'orbital_period' ||
      sortType === 'diameter' ||
      sortType === 'surface_water'
    );
  }

  connect(_collectionViewer: CollectionViewer): Observable<IPlanet[]> {
    console.log('Connecting data source');
    return this.planetSubject.asObservable();
  }

  disconnect(_collectionViewer: CollectionViewer): void {
    this.planetSubject.complete();
    this.loadingSubject.complete();
  }
}
