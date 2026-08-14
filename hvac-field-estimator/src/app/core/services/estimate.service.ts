import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Equipment } from '../models/equipment.model';
import { LaborRate, JobType } from '../models/labor-rate.model';
import { Estimate, EstimateLineItem } from '../models/estimate.model';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  private estimateSubject = new BehaviorSubject<Estimate>({
    equipment: [],
    laborHours: 0,
    notes: '',
    equipmentSubtotal: 0,
    laborSubtotal: 0,
    total: 0,
    lowEstimate: 0,
    highEstimate: 0
  });

  estimate$ = this.estimateSubject.asObservable();

  get estimate(): Estimate {
    return this.estimateSubject.value;
  }

  setCustomer(customer: Customer): void {
    this.update({
      customer
    });
  }

  setJobType(jobType: JobType): void {
    this.update({
      jobType,
      jobLevel: undefined,
      laborRate: undefined,
      laborHours: 0,
      equipment: []
    });
  }

  setLaborRate(rate: LaborRate): void {
    const hours = this.getDefaultHours(rate);

    this.update({
      laborRate: rate,
      jobLevel: rate.level,
      laborHours: hours
    });
  }

  setLaborHours(hours: number): void {
    const rate = this.estimate.laborRate;

    if (!rate) {
      return;
    }

    const clampedHours = Math.min(
      Math.max(hours, rate.estimatedHours.min),
      rate.estimatedHours.max
    );

    this.update({
      laborHours: clampedHours
    });
  }

  setEquipment(equipment: Equipment[]): void {
    const lineItems: EstimateLineItem[] = equipment.map(item => ({
      equipment: item,
      quantity: 1
    }));

    this.update({
      equipment: lineItems
    });
  }

  toggleEquipment(equipment: Equipment): void {
    const current = [...this.estimate.equipment];

    const existingIndex = current.findIndex(
      item => item.equipment.id === equipment.id
    );

    if (existingIndex >= 0) {
      current.splice(existingIndex, 1);
    } else {
      current.push({
        equipment,
        quantity: 1
      });
    }

    this.update({
      equipment: current
    });
  }

  updateQuantity(equipmentId: string, quantity: number): void {
    const updated = this.estimate.equipment.map(item => {
      if (item.equipment.id === equipmentId) {
        return {
          ...item,
          quantity: Math.max(1, quantity)
        };
      }

      return item;
    });

    this.update({
      equipment: updated
    });
  }

  setNotes(notes: string): void {
    this.update({
      notes
    });
  }

  clear(): void {
    this.estimateSubject.next({
      equipment: [],
      laborHours: 0,
      notes: '',
      equipmentSubtotal: 0,
      laborSubtotal: 0,
      total: 0,
      lowEstimate: 0,
      highEstimate: 0
    });
  }

  private update(changes: Partial<Estimate>): void {
    const estimate = {
      ...this.estimate,
      ...changes
    };

    const equipmentSubtotal = estimate.equipment.reduce(
      (total, item) =>
        total + item.equipment.baseCost * item.quantity,
      0
    );

    const laborSubtotal = estimate.laborRate
      ? estimate.laborRate.hourlyRate * estimate.laborHours
      : 0;

    const lowEstimate =
      equipmentSubtotal +
      (estimate.laborRate
        ? estimate.laborRate.hourlyRate *
          estimate.laborRate.estimatedHours.min
        : 0);

    const highEstimate =
      equipmentSubtotal +
      (estimate.laborRate
        ? estimate.laborRate.hourlyRate *
          estimate.laborRate.estimatedHours.max
        : 0);

    this.estimateSubject.next({
      ...estimate,
      equipmentSubtotal,
      laborSubtotal,
      total: equipmentSubtotal + laborSubtotal,
      lowEstimate,
      highEstimate
    });
  }

  private getDefaultHours(rate: LaborRate): number {
    return Math.round(
      ((rate.estimatedHours.min + rate.estimatedHours.max) / 2) * 2
    ) / 2;
  }
}
