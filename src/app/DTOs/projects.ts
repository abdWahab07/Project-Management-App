import { Task } from "./TaskDto";
export interface ProjectDto {
  projectId: number;
  name: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  managerName: string;
  departmentName: string;
  taskCounts: number;  // New property
  tasks?: Task[]; // Optional tasks array
}
