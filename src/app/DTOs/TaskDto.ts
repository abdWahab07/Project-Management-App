export interface Task {
  status: string;
  taskId: number;
  projectName: string;
  projectId: number;
  taskName: string;
  startTime: Date;
  endTime: Date;
  assignedEmployeeName: string;
  taskDetails: string;
  progressPercentage: number;
}
