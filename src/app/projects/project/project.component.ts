import { Component, OnInit } from '@angular/core';
import { of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'] // Updated to styleUrls
})
export class ProjectComponent implements OnInit {
  loading: boolean = true;

  ngOnInit(): void {
    // Simulate a 2-second loading delay
    timer(2000).pipe(
      switchMap(() => {
        // Here you could perform any additional loading logic
        return of(true); // Indicating that loading is complete
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }
}
