export interface AnnouncementDto {
  id?: number;
  announcementText: string;
  startDate: string;  // Use ISO string for dates
  endDate: string;    // Use ISO string for dates
}
