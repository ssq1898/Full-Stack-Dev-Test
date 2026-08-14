import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Customer } from '../models/customer.model';

interface RawCustomer {
  id: string;
  name: string;
  address: string;
  phone?: string;
  propertyType?: 'residential' | 'commercial';
  property_type?: 'residential' | 'commercial';
  squareFootage?: number;
  sqft?: number;
  systemType: string;
  systemAge: number;
  lastServiceDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly dataUrl = 'assets/data/customers.json';

  private customers$ = this.http.get<RawCustomer[]>(this.dataUrl).pipe(
    map(customers =>
      customers.map(customer => this.normalizeCustomer(customer))
    ),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.customers$;
  }

  getCustomer(id: string): Observable<Customer | undefined> {
    return this.customers$.pipe(
      map(customers => customers.find(customer => customer.id === id))
    );
  }

  private normalizeCustomer(customer: RawCustomer): Customer {
    return {
      id: customer.id,
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      propertyType:
        customer.propertyType ?? customer.property_type ?? 'residential',
      squareFootage: customer.squareFootage ?? customer.sqft ?? 0,
      systemType: customer.systemType,
      systemAge: customer.systemAge,
      lastServiceDate: customer.lastServiceDate
    };
  }
}
