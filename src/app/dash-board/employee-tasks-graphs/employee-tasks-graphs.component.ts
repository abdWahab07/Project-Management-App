import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-task-details',
  templateUrl: './employee-tasks-graphs.component.html',
  styleUrls: ['./employee-tasks-graphs.component.css']
})
export class EmployeeTasksGraphsComponent implements OnInit, AfterViewInit {
  totalTasks!: number;
  pendingTasks!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch totalTasks and pendingTasks from the query parameters
    this.totalTasks = +this.route.snapshot.queryParamMap.get('totalTasks')!;
    this.pendingTasks = +this.route.snapshot.queryParamMap.get('pendingTasks')!;
  }

  ngAfterViewInit(): void {
    // Create chart after view has been initialized
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById("tasksPieChart") as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      options: {
        responsive: true,
        maintainAspectRatio: false, // This allows the chart to adjust to its container size
        rotation: -20,
        cutout: '10%',
        animation: {
          animateScale: true,
        },
        plugins: {
          legend: {
            position: 'left',
            labels: {
              boxWidth: 10,
              pointStyle: 'circle',
              color: '#aaa',
              usePointStyle: true,
            }
          }
        }
      },
      data: {
        labels: ["Total Tasks", "Pending Tasks"],
        datasets: [{
          data: [this.totalTasks, this.pendingTasks],
          borderWidth: 2,
          backgroundColor: [
            'rgba(70, 215, 212, 0.2)',
            'rgba(245, 225, 50, 0.2)',
          ],
          borderColor: [
            '#46d8d5',
            '#f5e132',
          ],
          hoverBackgroundColor: [
            '#46d8d5',
            '#f5e132',
          ]
        }]
      }
    });
  }

}
