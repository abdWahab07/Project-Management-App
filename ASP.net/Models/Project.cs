using System.ComponentModel.DataAnnotations;
using System;

namespace testing_mode.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string ManagerName { get; set; }

        [Required]
        public string DepartmentName { get; set; }

        // New column
        public int TaskCounts { get; set; } = 0;
    }
}
