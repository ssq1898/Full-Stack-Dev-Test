import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Equipment } from '../models/equipment.model';

interface RawEquipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  baseCost?: number;
  base_cost?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly dataUrl = 'assets/data/equipment.json';

  private equipment$ = this.http.get<RawEquipment[]>(this.dataUrl).pipe(
    map(items =>
      items.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        brand: item.brand,
        modelNumber: item.modelNumber,
        baseCost: item.baseCost ?? item.base_cost ?? 0
      }))
    ),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  getEquipment(): Observable<Equipment[]> {
    return this.equipment$;
  }

  getEquipmentByCategory(category: string): Observable<Equipment[]> {
    return this.equipment$.pipe(
      map(items =>
        items.filter(item => item.category === category)
      )
    );
  }
}
