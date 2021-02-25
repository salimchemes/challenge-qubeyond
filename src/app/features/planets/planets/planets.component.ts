import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { PlanetsDataSource } from 'src/app/services/planets.datasource';
import { planetColumns, noResult } from '../utils/constants';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();
  planetsForm: FormGroup;
  dataSource: PlanetsDataSource;
  displayedColumns = planetColumns;
  noResult = noResult;

  private subscriptions: { [key: string]: any } = {};

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new PlanetsDataSource(this.apiService);
    this.planetsForm = this.fb.group({ search: '' });
  }

  ngOnInit(): void {
    this.dataSource.loadPlanets();
  }

  ngAfterViewInit() {
    this.subscriptions.sort = this.sort.sortChange.subscribe((sortChange) => {
      this.dataSource.sortPlanets(sortChange.active, sortChange.direction);
    });

    this.subscriptions.search = this.planetsForm.controls.search.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((searchTerm) => {
        this.dataSource.searchPlanets(searchTerm);
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach((key) =>
      this.subscriptions[key].unsubscribe()
    );
  }
}
