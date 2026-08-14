export interface Customer {
  id: string;
  name: string;
  address: string;
  phone?: string;
  propertyType: 'residential' | 'commercial';
  squareFootage: number;
  systemType: string;
  systemAge: number;
  lastServiceDate?: string;
}
