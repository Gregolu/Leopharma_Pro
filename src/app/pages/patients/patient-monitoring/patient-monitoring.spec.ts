import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMonitoring } from './patient-monitoring';

describe('PatientMonitoring', () => {
  let component: PatientMonitoring;
  let fixture: ComponentFixture<PatientMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMonitoring],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientMonitoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
