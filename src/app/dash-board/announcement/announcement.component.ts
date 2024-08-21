import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { AnnouncementDto } from '../../announcements.dto';

interface PaginatedAnnouncements {
  page: number;
  pageSize: number;
  totalPages: number;
  announcements: AnnouncementDto[];
}

@Component({
  selector: 'app-announcement-display',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcements: AnnouncementDto[] = [];

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (response: PaginatedAnnouncements) => {
        this.announcements = response.announcements;
      },
      (error) => console.error('Error loading announcements', error)
    );
  }
}
