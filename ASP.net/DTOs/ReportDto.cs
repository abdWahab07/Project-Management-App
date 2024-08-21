using System;
using System.Collections.Generic;

namespace testing_mode.Models.Dto
{
    public class ReportDto
    {
        public int ReportId { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string CompanyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ManagerName { get; set; }
        public string DepartmentName { get; set; }
        public int TaskCounts { get; set; }
        public List<string> CompletedTasks { get; set; }
        public List<string> AssignedEmployees { get; set; }
        public string PdfFileUrl { get; set; }
        public DateTime SubmissionDate { get; set; }
        public string Status { get; set; }
    }
}
