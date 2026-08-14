import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';
import { EstimateService } from '../../../core/services/estimate.service';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customer;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private estimateService: EstimateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/customers']);
      return;
    }

    this.customerService.getCustomer(id).subscribe(customer => {
      this.customer = customer;
      this.loading = false;
    });
  }

  startEstimate(): void {
    if (!this.customer) {
      return;
    }

    this.estimateService.clear();
    this.estimateService.setCustomer(this.customer);

    this.router.navigate(['/estimate/start']);
  }
}
