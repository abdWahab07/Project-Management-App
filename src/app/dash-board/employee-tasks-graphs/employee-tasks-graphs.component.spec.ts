import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTasksGraphsComponent } from './employee-tasks-graphs.component';

describe('EmployeeTasksGraphsComponent', () => {
  let component: EmployeeTasksGraphsComponent;
  let fixture: ComponentFixture<EmployeeTasksGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTasksGraphsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTasksGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
