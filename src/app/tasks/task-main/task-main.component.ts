import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css']
})
export class TaskMainComponent implements OnInit {
  isLoaded = false;

  ngOnInit(): void {
    // Simulate a delay for lazy loading
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000); // 2000ms = 2 seconds
  }
}
