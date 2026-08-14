import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Equipment } from '../../../core/models/equipment.model';
import { LaborRate, JobType } from '../../../core/models/labor-rate.model';
import { EquipmentService } from '../../../core/services/equipment.service';
import { LaborService } from '../../../core/services/labor.service';
import { EstimateService } from '../../../core/services/estimate.service';

@Component({
  selector: 'app-estimate-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estimate-builder.component.html',
  styleUrl: './estimate-builder.component.css'
})
export class EstimateBuilderComponent implements OnInit {
  equipment: Equipment[] = [];
  laborRates: LaborRate[] = [];

  selectedCategory = 'All';
  selectedLabor?: LaborRate;

  estimateNotes = '';

  categories: string[] = ['All'];

  constructor(
    private equipmentService: EquipmentService,
    private laborService: LaborService,
    private estimateService: EstimateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobType = this.estimateService.estimate.jobType;

    if (!jobType || !this.estimateService.estimate.customer) {
      this.router.navigate(['/customers']);
      return;
    }

    this.equipmentService.getEquipment().subscribe(items => {
      this.equipment = items;
      this.categories = [
        'All',
        ...Array.from(new Set(items.map(item => item.category)))
      ];
    });

    this.laborService
      .getLaborRatesForJob(jobType)
      .subscribe(rates => {
        this.laborRates = rates;

        const currentRate = this.estimateService.estimate.laborRate;

        if (currentRate) {
          this.selectedLabor = currentRate;
        }
      });

    this.estimateNotes = this.estimateService.estimate.notes;
  }

  get estimate() {
    return this.estimateService.estimate;
  }

  get jobType(): JobType | undefined {
    return this.estimate.jobType;
  }

  get filteredEquipment(): Equipment[] {
    if (this.selectedCategory === 'All') {
      return this.equipment;
    }

    return this.equipment.filter(
      item => item.category === this.selectedCategory
    );
  }

  isSelected(item: Equipment): boolean {
    return this.estimate.equipment.some(
      selected => selected.equipment.id === item.id
    );
  }

  toggleEquipment(item: Equipment): void {
    this.estimateService.toggleEquipment(item);
  }

  selectLabor(rate: LaborRate): void {
    this.selectedLabor = rate;
    this.estimateService.setLaborRate(rate);
  }

  changeHours(amount: number): void {
    const current = this.estimate.laborHours;
    this.estimateService.setLaborHours(current + amount);
  }

  updateHours(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.estimateService.setLaborHours(Number(input.value));
  }

  saveNotes(): void {
    this.estimateService.setNotes(this.estimateNotes);
  }

  continue(): void {
    this.saveNotes();

    if (!this.estimate.laborRate) {
      return;
    }

    this.router.navigate(['/estimate/review']);
  }

  get minimumHours(): number {
    return this.estimate.laborRate?.estimatedHours.min ?? 0;
  }

  get maximumHours(): number {
    return this.estimate.laborRate?.estimatedHours.max ?? 0;
  }
}
