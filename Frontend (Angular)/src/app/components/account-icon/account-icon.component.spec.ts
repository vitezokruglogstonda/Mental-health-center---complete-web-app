import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIconComponent } from './account-icon.component';

describe('AccountIconComponent', () => {
  let component: AccountIconComponent;
  let fixture: ComponentFixture<AccountIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
