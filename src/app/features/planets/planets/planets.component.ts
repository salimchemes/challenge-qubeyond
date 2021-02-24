import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { IPlanet } from 'src/app/models/planet';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsComponent implements OnInit {
  planets$: Observable<IPlanet[]>;

  constructor(private apiService: ApiService) {
    this.planets$ = this.apiService.getPlanets();
  }

  ngOnInit(): void {}
}
