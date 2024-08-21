import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-detail.component';
import { UpdateTaskComponent } from '../task-update/task-update.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent, UpdateTaskComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Add your tests here
});
