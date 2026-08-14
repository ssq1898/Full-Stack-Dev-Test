import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateStartComponent } from './estimate-start.component';

describe('EstimateStartComponent', () => {
  let component: EstimateStartComponent;
  let fixture: ComponentFixture<EstimateStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimateStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
