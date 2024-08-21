import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays } from 'date-fns';
import { ProjectService1 } from '../../services/projects.service1';
import { ProjectDto } from '../../DTOs/projects';

@Component({
  selector: 'project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.css']
})
export class ProjectCalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private projectService: ProjectService1) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects: ProjectDto[]) => {
      this.events = projects.map(project => ({
        start: new Date(project.startDate),
        end: addDays(new Date(project.endDate), 1),
        title: project.name
      }));

      const projectsWithStringDates = projects.map(project => ({
        ...project,
        startDate: project.startDate.toISOString(),
        endDate: project.endDate.toISOString()
      }));

      console.log('Projects with string dates:', projectsWithStringDates);
    });
  }
}
