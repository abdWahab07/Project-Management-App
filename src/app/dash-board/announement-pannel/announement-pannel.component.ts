import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { AnnouncementDto } from '../../announcements.dto';

@Component({
  selector: 'app-announement-pannel',
  templateUrl: './announement-pannel.component.html',
  styleUrls: ['./announement-pannel.component.css']
})
export class AnnounementPannelComponent implements OnInit {
  announcements: AnnouncementDto[] = [];
  newAnnouncement: Partial<AnnouncementDto> = {};

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (response) => {
        this.announcements = response.announcements; // Extract the announcements array from the response
      },
      (error) => console.error('Error loading announcements', error)
    );
  }

  addAnnouncement(): void {
    if (this.newAnnouncement) {
      this.announcementService.createAnnouncement(this.newAnnouncement as AnnouncementDto).subscribe(
        () => {
          this.loadAnnouncements();
          this.newAnnouncement = {}; // Clear the form
        },
        error => console.error('Error adding announcement', error)
      );
    }
  }

  deleteAnnouncement(id: number): void {
    this.announcementService.deleteAnnouncement(id).subscribe({
      next: () => {
        console.log('Announcement deleted successfully');
        this.loadAnnouncements(); // Reload announcements after deletion
      },
      error: (error) => console.error('Error deleting announcement', error)
    });
  }

  deleteExpired(): void {
    this.announcementService.deleteExpiredAnnouncements().subscribe(
      () => this.loadAnnouncements(), // Reload announcements after deleting expired ones
      error => console.error('Error deleting expired announcements', error)
    );
  }
}
