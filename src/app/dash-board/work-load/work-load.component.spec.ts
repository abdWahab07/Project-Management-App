import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLoadComponent } from './work-load.component';

describe('WorkLoadComponent', () => {
  let component: WorkLoadComponent;
  let fixture: ComponentFixture<WorkLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
