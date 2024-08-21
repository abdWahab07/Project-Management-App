import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCalendarComponent } from './progress-calendar.component';

describe('ProgressCalendarComponent', () => {
  let component: ProgressCalendarComponent;
  let fixture: ComponentFixture<ProgressCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
