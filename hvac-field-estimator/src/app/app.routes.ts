import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./features/customers/customer-list/customer-list.component')
        .then(m => m.CustomerListComponent)
  },
  {
    path: 'customers/:id',
    loadComponent: () =>
      import('./features/customers/customer-detail/customer-detail.component')
        .then(m => m.CustomerDetailComponent)
  },
  {
    path: 'estimate/start',
    loadComponent: () =>
      import('./features/estimate/estimate-start/estimate-start.component')
        .then(m => m.EstimateStartComponent)
  },
  {
    path: 'estimate/builder',
    loadComponent: () =>
      import('./features/estimate/estimate-builder/estimate-builder.component')
        .then(m => m.EstimateBuilderComponent)
  },
  {
    path: 'estimate/review',
    loadComponent: () =>
      import('./features/estimate/estimate-review/estimate-review.component')
        .then(m => m.EstimateReviewComponent)
  },
  {
    path: 'estimate/customer',
    loadComponent: () =>
      import('./features/estimate/customer-estimate/customer-estimate.component')
        .then(m => m.CustomerEstimateComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
