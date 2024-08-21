using System;
using System.ComponentModel.DataAnnotations;

namespace testing_mode.Models
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string AnnouncementText { get; set; } = string.Empty; // Initialized to avoid null warnings

        [Required]
        public DateOnly StartDate { get; set; }

        [Required]
        public DateOnly EndDate { get; set; }
    }
}
