// Dtos/AnnouncementDto.cs
namespace testing_mode.Dtos
{
    public class AnnouncementDto
    {
        public int Id { get; set; }
        public string AnnouncementText { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
}
