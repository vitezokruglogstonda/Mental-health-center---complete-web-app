import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleCardComponent } from './patient-schedule-card.component';

describe('PatientScheduleCardComponent', () => {
  let component: PatientScheduleCardComponent;
  let fixture: ComponentFixture<PatientScheduleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientScheduleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientScheduleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
