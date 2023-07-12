import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpComponent } from './seek-help.component';

describe('SeekHelpComponent', () => {
  let component: SeekHelpComponent;
  let fixture: ComponentFixture<SeekHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
