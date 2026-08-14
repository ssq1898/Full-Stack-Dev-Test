import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { LaborRate, JobType } from '../models/labor-rate.model';

@Injectable({
  providedIn: 'root'
})
export class LaborService {
  private readonly dataUrl = 'assets/data/labor_rates.json';

  private laborRates$ = this.http
    .get<LaborRate[]>(this.dataUrl)
    .pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  getLaborRates(): Observable<LaborRate[]> {
    return this.laborRates$;
  }

  getLaborRatesForJob(jobType: JobType): Observable<LaborRate[]> {
    return this.laborRates$.pipe(
      map(rates => rates.filter(rate => rate.jobType === jobType))
    );
  }
}
