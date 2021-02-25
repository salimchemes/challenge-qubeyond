import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PlanetsComponent } from './planets/planets.component';
import { RouterModule } from '@angular/router';
import { PlanetsRoutes } from './routes';

@NgModule({
  declarations: [PlanetsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(PlanetsRoutes),
  ],
})
export class PlanetsModule {}
