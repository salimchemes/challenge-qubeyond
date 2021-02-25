import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/services/api.service';
import { planetColumns, noResult } from '../utils/constants';
import { PlanetsComponent } from './planets.component';
import { ChangeDetectorRef } from '@angular/core';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockApiService: ApiService;
  let cdrMock: ChangeDetectorRef;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder, ChangeDetectorRef],
      declarations: [PlanetsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    mockApiService = TestBed.get(ApiService);
    cdrMock = TestBed.get(ChangeDetectorRef);
    fb = TestBed.get(FormBuilder);
    component = new PlanetsComponent(mockApiService, fb, cdrMock);

    fixture.detectChanges();
  });

  it('should create', () => {
    // assert
    expect(component).toBeTruthy();
  });
  it('should validate 10 columns', () => {
    // assert
    expect(component.displayedColumns).toBe(planetColumns);
    expect(component.displayedColumns.length).toBe(10);
  });

  it('should validate no results message', () => {
    // arrange
    const noResultsElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      '.no-results'
    );

    // assert
    expect(noResultsElement.textContent).toContain(noResult);
  });
});
