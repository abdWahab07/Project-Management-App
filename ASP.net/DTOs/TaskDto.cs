namespace testing_mode.Models.Dto
{
    public class TaskDto
    {
        public int TaskId { get; set; }
        public int ProjectId { get; set; }
        public string TaskName { get; set; }
        public string AssignedEmployeeName { get; set; }
        public DateOnly StartDate { get; set; }  // Changed to DateOnly
        public DateOnly EndDate { get; set; }    // Changed to DateOnly
        public string TaskDetails { get; set; }
        public int PercentageCompleted { get; set; }
        public string Status { get; set; }
    }
}
