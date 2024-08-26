import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { AnnouncementDto } from '../announcements.dto';

interface PaginatedAnnouncements {
  page: number;
  pageSize: number;
  totalPages: number;
  announcements: AnnouncementDto[];
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = 'http://localhost:5162/api/announcements';

  constructor() {}

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  getAnnouncements(): Observable<PaginatedAnnouncements> {
    return from(
      axios.get<PaginatedAnnouncements>(this.baseUrl)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error fetching announcements:', error);
          throw error;
        })
    );
  }

  createAnnouncement(announcement: AnnouncementDto): Observable<AnnouncementDto> {
    return from(
      axios.post<AnnouncementDto>(this.baseUrl, announcement)
        .then(this.handleResponse)
        .catch(error => {
          console.error('Error creating announcement:', error);
          throw error;
        })
    );
  }

  deleteAnnouncement(id: number): Observable<void> {
    return from(
      axios.delete<void>(`${this.baseUrl}/${id}`)
        .then(() => undefined)
        .catch(error => {
          console.error('Error deleting announcement:', error);
          throw error;
        })
    );
  }

  deleteExpiredAnnouncements(): Observable<void> {
    return from(
      axios.delete<void>(`${this.baseUrl}/expired`)
        .then(() => undefined)
        .catch(error => {
          console.error('Error deleting expired announcements:', error);
          throw error;
        })
    );
  }
}
