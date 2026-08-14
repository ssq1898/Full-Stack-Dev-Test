import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateComponent } from './customer-estimate.component';

describe('CustomerEstimateComponent', () => {
  let component: CustomerEstimateComponent;
  let fixture: ComponentFixture<CustomerEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEstimateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
