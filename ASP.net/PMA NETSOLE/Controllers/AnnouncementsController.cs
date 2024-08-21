using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testing_mode.Models; // Ensure this namespace contains your Announcement model
using Employees.Data; // Ensure this namespace contains your EmployeeDbContext
using testing_mode.Services; // Ensure this namespace contains your ILoggingService

namespace testing_mode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly ILoggingService _loggingService;

        public AnnouncementsController(EmployeeDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }

        // GET: api/announcements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements(int page = 1, int pageSize = 10)
        {
            try
            {
                var totalAnnouncements = await _context.Announcements.CountAsync();
                var totalPages = (int)Math.Ceiling(totalAnnouncements / (double)pageSize);

                var announcements = await _context.Announcements
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    Announcements = announcements
                });
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving announcements.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // POST: api/announcements
        [HttpPost]
        public async Task<ActionResult<Announcement>> PostAnnouncement(Announcement announcement)
        {
            if (announcement == null || string.IsNullOrEmpty(announcement.AnnouncementText))
            {
                return BadRequest("Announcement is invalid or missing a title.");
            }

            try
            {
                _context.Announcements.Add(announcement);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAnnouncements), new { id = announcement.Id }, announcement);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while posting a new announcement.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // DELETE: api/announcements/expired
        [HttpDelete("expired")]
        public async Task<IActionResult> DeleteExpiredAnnouncements()
        {
            try
            {
                var expiredAnnouncements = _context.Announcements
                    .Where(a => a.EndDate < DateOnly.FromDateTime(DateTime.UtcNow))
                    .ToList();

                if (!expiredAnnouncements.Any())
                {
                    return NotFound("No expired announcements found.");
                }

                _context.Announcements.RemoveRange(expiredAnnouncements);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while deleting expired announcements.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
