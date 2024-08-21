import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService1 } from '../../services/projects.service1';
import { ProjectDto } from '../../DTOs/projects';
import * as d3 from 'd3';

@Component({
  selector: 'work-load',
  templateUrl: './work-load.component.html',
  styleUrls: ['./work-load.component.css']
})
export class WorkLoadComponent implements OnInit, AfterViewInit {
  projects: ProjectDto[] = [];

  constructor(private projectService1: ProjectService1) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadProjects(): void {
    this.projectService1.getProjects().subscribe((data) => {
      this.projects = data;
      // Create chart after data is loaded
      this.createChart();
    });
  }

  createChart(): void {
    const svg = d3.select('svg');
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(this.projects.map(d => d.name))
      .range([0, width])
      .padding(0.9);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.projects, d => d.taskCounts) || 0])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    g.selectAll('.bar')
      .data(this.projects)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) || 0)
      .attr('y', d => y(d.taskCounts))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.taskCounts))
      .attr('fill', d => color(d.name));

    // X-axis label
    svg.append('text')
      .attr('transform', `translate(${width / 2 + margin.left}, ${height + margin.top + 30})`)
      .style('text-anchor', 'middle')
      .text('PROJECTS');

    // Y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left - 50)
      .attr('x', -(height / 2 + margin.top))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('PENDING TASKS');
  }
}
