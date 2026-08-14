import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateReviewComponent } from './estimate-review.component';

describe('EstimateReviewComponent', () => {
  let component: EstimateReviewComponent;
  let fixture: ComponentFixture<EstimateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimateReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
