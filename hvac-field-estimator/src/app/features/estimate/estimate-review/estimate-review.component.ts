import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EstimateService } from '../../../core/services/estimate.service';

@Component({
  selector: 'app-estimate-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './estimate-review.component.html',
  styleUrl: './estimate-review.component.css'
})
export class EstimateReviewComponent {
  constructor(
    public estimateService: EstimateService,
    private router: Router
  ) {}

  get estimate() {
    return this.estimateService.estimate;
  }

  editEstimate(): void {
    this.router.navigate(['/estimate/builder']);
  }

  createCustomerEstimate(): void {
    this.router.navigate(['/estimate/customer']);
  }
}
