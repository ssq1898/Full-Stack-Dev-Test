import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JobType } from '../../../core/models/labor-rate.model';
import { EstimateService } from '../../../core/services/estimate.service';

@Component({
  selector: 'app-estimate-start',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estimate-start.component.html',
  styleUrl: './estimate-start.component.css'
})
export class EstimateStartComponent {
  selectedJobType?: JobType;

  jobTypes: {
    value: JobType;
    title: string;
    description: string;
    icon: string;
  }[] = [
    {
      value: 'repair',
      title: 'Repair',
      description: 'Replace or repair a failed component.',
      icon: 'bi-tools'
    },
    {
      value: 'install',
      title: 'Installation',
      description: 'Install or replace HVAC equipment.',
      icon: 'bi-house-gear'
    },
    {
      value: 'maintenance',
      title: 'Maintenance',
      description: 'Routine or comprehensive maintenance.',
      icon: 'bi-check2-circle'
    },
    {
      value: 'diagnostic',
      title: 'Diagnostic',
      description: 'Diagnose an HVAC system issue.',
      icon: 'bi-search'
    },
    {
      value: 'ductwork',
      title: 'Ductwork',
      description: 'Repair or install ductwork.',
      icon: 'bi-wind'
    }
  ];

  constructor(
    private estimateService: EstimateService,
    private router: Router
  ) {}

  selectJobType(type: JobType): void {
    this.selectedJobType = type;
  }

  continue(): void {
    if (!this.selectedJobType) {
      return;
    }

    this.estimateService.setJobType(this.selectedJobType);
    this.router.navigate(['/estimate/builder']);
  }

  get customer() {
    return this.estimateService.estimate.customer;
  }
}
