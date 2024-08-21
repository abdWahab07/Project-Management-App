// TaskDto.ts
export interface TaskDTOs {
  id: number;
  title: string;
  description: string;
  assignedEmployeeName: string;
  startTime: string; // or Date
  endTime: string; // or Date
  percentageCompleted: number;
}
