namespace testing_mode.DTOs
{
    public class EmployeeWithTaskInfoDto
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public int Experience { get; set; }
        public string Description { get; set; }
        public string PastDesignation { get; set; }
        public int TotalTasks { get; set; }
        public int PendingTasks { get; set; }
        public int CompletedTasks { get; set; }
    }
}
