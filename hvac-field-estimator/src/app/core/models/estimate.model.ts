import { Customer } from './customer.model';
import { Equipment } from './equipment.model';
import { LaborRate, JobType } from './labor-rate.model';

export interface EstimateLineItem {
  equipment: Equipment;
  quantity: number;
}

export interface Estimate {
  customer?: Customer;

  jobType?: JobType;
  jobLevel?: string;

  equipment: EstimateLineItem[];

  laborRate?: LaborRate;
  laborHours: number;

  notes: string;

  equipmentSubtotal: number;
  laborSubtotal: number;
  total: number;

  lowEstimate: number;
  highEstimate: number;
}
