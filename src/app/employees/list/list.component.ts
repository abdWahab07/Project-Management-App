import { Component, OnInit } from '@angular/core';
import { listServices } from '../../services/list.service';
import { Employee } from '../../DTOs/Employee';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListComponent implements OnInit {
  lists: Employee[] = [];

  constructor(private listServices: listServices) { }

  ngOnInit(): void {
    this.listServices.getList().subscribe(data => {
      this.lists = data;
    });
  }
}
