import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSPComponent } from './msp.component';

describe('MSPComponent', () => {
  let component: MSPComponent;
  let fixture: ComponentFixture<MSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MSPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
