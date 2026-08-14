import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EstimateService } from '../../../core/services/estimate.service';

@Component({
  selector: 'app-customer-estimate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-estimate.component.html',
  styleUrl: './customer-estimate.component.css'
})
export class CustomerEstimateComponent {
  estimate = this.estimateService.estimate;

  constructor(
    private estimateService: EstimateService,
    private router: Router
  ) {}

  newEstimate(): void {
    this.estimateService.clear();
    this.router.navigate(['/customers']);
  }
}
