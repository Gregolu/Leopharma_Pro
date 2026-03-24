import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exportation } from './exportation';

describe('Exportation', () => {
  let component: Exportation;
  let fixture: ComponentFixture<Exportation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exportation],
    }).compileComponents();

    fixture = TestBed.createComponent(Exportation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
