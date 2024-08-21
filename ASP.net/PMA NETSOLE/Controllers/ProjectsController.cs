using Microsoft.AspNetCore.Mvc;
using Employees.Data;
using Employees.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testing_mode.Models;
using testing_mode.Models.Dto;
using testing_mode.Services; // Ensure this namespace contains your ILoggingService

namespace testing_mode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly ILoggingService _loggingService;

        public ProjectsController(EmployeeDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            try
            {
                var projects = await _context.Projects
                    .Select(p => new ProjectDto
                    {
                        ProjectId = p.ProjectId,
                        Name = p.Name,
                        CompanyName = p.CompanyName,
                        StartDate = p.StartDate,
                        EndDate = p.EndDate,
                        ManagerName = p.ManagerName,
                        DepartmentName = p.DepartmentName,
                        TaskCounts = p.TaskCounts
                    })
                    .ToListAsync();

                return Ok(projects);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving projects.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            try
            {
                var project = await _context.Projects
                    .Where(p => p.ProjectId == id)
                    .Select(p => new ProjectDto
                    {
                        ProjectId = p.ProjectId,
                        Name = p.Name,
                        CompanyName = p.CompanyName,
                        StartDate = p.StartDate,
                        EndDate = p.EndDate,
                        ManagerName = p.ManagerName,
                        DepartmentName = p.DepartmentName,
                        TaskCounts = p.TaskCounts
                    })
                    .FirstOrDefaultAsync();

                if (project == null)
                {
                    return NotFound();
                }

                return Ok(project);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving project by ID.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("createOrUpdateReport/{projectId}")]
        public async Task<ActionResult<ReportDto>> CreateOrUpdateReport(int projectId)
        {
            try
            {
                var project = await _context.Projects.FindAsync(projectId);
                if (project == null)
                {
                    return NotFound("Project not found");
                }

                var completedTasks = await _context.Tasks
                    .Where(t => t.ProjectId == projectId && t.Status == "completed")
                    .Select(t => new
                    {
                        t.TaskName,
                        t.AssignedEmployeeName
                    })
                    .ToListAsync();

                var report = await _context.Reports
                    .FirstOrDefaultAsync(r => r.ProjectId == projectId);

                if (report == null)
                {
                    report = new Report
                    {
                        ProjectId = projectId,
                        ProjectName = project.Name,
                        CompanyName = project.CompanyName,
                        StartDate = project.StartDate,
                        EndDate = project.EndDate,
                        ManagerName = project.ManagerName,
                        DepartmentName = project.DepartmentName,
                        TaskCounts = project.TaskCounts,
                        CompletedTasks = completedTasks.Select(t => t.TaskName).ToList(),
                        AssignedEmployees = completedTasks.Select(t => t.AssignedEmployeeName).Distinct().ToList(),
                        PdfFileUrl = "pdf_url_here",
                        SubmissionDate = DateTime.UtcNow,
                        Status = "Generated"
                    };

                    _context.Reports.Add(report);
                }
                else
                {
                    report.CompletedTasks = completedTasks.Select(t => t.TaskName).ToList();
                    report.AssignedEmployees = completedTasks.Select(t => t.AssignedEmployeeName).Distinct().ToList();
                    report.SubmissionDate = DateTime.UtcNow;
                    report.Status = "Updated";

                    _context.Reports.Update(report);
                }

                await _context.SaveChangesAsync();

                var reportDto = new ReportDto
                {
                    ReportId = report.ReportId,
                    ProjectId = report.ProjectId,
                    ProjectName = report.ProjectName,
                    CompanyName = report.CompanyName,
                    StartDate = report.StartDate,
                    EndDate = report.EndDate,
                    ManagerName = report.ManagerName,
                    DepartmentName = report.DepartmentName,
                    TaskCounts = report.TaskCounts,
                    CompletedTasks = report.CompletedTasks,
                    AssignedEmployees = report.AssignedEmployees,
                    PdfFileUrl = report.PdfFileUrl,
                    SubmissionDate = report.SubmissionDate,
                    Status = report.Status
                };

                return Ok(reportDto);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while creating or updating report.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> PostProject(ProjectDto projectDto)
        {
            if (projectDto == null)
            {
                return BadRequest("ProjectDto is null");
            }

            try
            {
                var project = new Project
                {
                    Name = projectDto.Name,
                    CompanyName = projectDto.CompanyName,
                    StartDate = DateTime.SpecifyKind(projectDto.StartDate, DateTimeKind.Utc),
                    EndDate = DateTime.SpecifyKind(projectDto.EndDate, DateTimeKind.Utc),
                    ManagerName = projectDto.ManagerName,
                    DepartmentName = projectDto.DepartmentName,
                    TaskCounts = projectDto.TaskCounts
                };

                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                projectDto.ProjectId = project.ProjectId;

                // Create a new report
                await CreateOrUpdateReport(project.ProjectId);

                return CreatedAtAction(nameof(GetProject), new { id = project.ProjectId }, projectDto);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while posting a new project.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, ProjectDto projectDto)
        {
            if (id != projectDto.ProjectId)
            {
                return BadRequest("Project ID mismatch");
            }

            if (projectDto == null)
            {
                return BadRequest("ProjectDto is null");
            }

            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    return NotFound();
                }

                project.Name = projectDto.Name;
                project.CompanyName = projectDto.CompanyName;
                project.StartDate = DateTime.SpecifyKind(projectDto.StartDate, DateTimeKind.Utc);
                project.EndDate = DateTime.SpecifyKind(projectDto.EndDate, DateTimeKind.Utc);
                project.ManagerName = projectDto.ManagerName;
                project.DepartmentName = projectDto.DepartmentName;
                project.TaskCounts = projectDto.TaskCounts;

                _context.Entry(project).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProjectExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while updating project.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    return NotFound();
                }

                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while deleting project.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.ProjectId == id);
        }
    }
}
