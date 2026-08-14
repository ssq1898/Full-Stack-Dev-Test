import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateBuilderComponent } from './estimate-builder.component';

describe('EstimateBuilderComponent', () => {
  let component: EstimateBuilderComponent;
  let fixture: ComponentFixture<EstimateBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimateBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimateBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
