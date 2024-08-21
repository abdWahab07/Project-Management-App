using System;

namespace testing_mode.Models.Dto
{
    public class ProjectDto
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ManagerName { get; set; }
        public string DepartmentName { get; set; }
        public int TaskCounts { get; set; }
    }
}
