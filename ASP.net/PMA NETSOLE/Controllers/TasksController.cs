using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Task = testing_mode.Models.Task; // Alias for your Task model
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Employees.Data;
using testing_mode.Models;
using testing_mode.Models.Dto;

namespace testing_mode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly ILogger<TasksController> _logger;

        public TasksController(EmployeeDbContext context, ILogger<TasksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("byProject/{projectId}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByProjectId(int projectId)
        {
            try
            {
                var tasks = await _context.Tasks
                    .Where(t => t.ProjectId == projectId)
                    .Select(t => new TaskDto
                    {
                        TaskId = t.TaskId,
                        ProjectId = t.ProjectId,
                        TaskName = t.TaskName,
                        AssignedEmployeeName = t.AssignedEmployeeName,
                        StartDate = t.StartDate,
                        EndDate = t.EndDate,
                        TaskDetails = t.TaskDetails,
                        PercentageCompleted = t.PercentageCompleted,
                        Status = t.Status,
                    })
                    .ToListAsync();

                if (!tasks.Any())
                {
                    var message = "No tasks found for the specified project.";
                    Response.Headers.Add("X-Status-Message", message);
                    _logger.LogInformation(message);
                    return Ok(message);
                }

                var successMessage = $"Successfully retrieved {tasks.Count} tasks for project ID {projectId}.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while retrieving tasks by project ID.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            try
            {
                var tasks = await _context.Tasks
                    .Select(t => new TaskDto
                    {
                        TaskId = t.TaskId,
                        ProjectId = t.ProjectId,
                        TaskName = t.TaskName,
                        AssignedEmployeeName = t.AssignedEmployeeName,
                        StartDate = t.StartDate,
                        EndDate = t.EndDate,
                        TaskDetails = t.TaskDetails,
                        PercentageCompleted = t.PercentageCompleted,
                        Status = t.Status,
                    })
                    .ToListAsync();

                if (!tasks.Any())
                {
                    var message = "No tasks available.";
                    Response.Headers.Add("X-Status-Message", message);
                    _logger.LogInformation(message);
                    return Ok(message);
                }

                var successMessage = $"Successfully retrieved {tasks.Count} tasks.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while retrieving all tasks.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            try
            {
                var task = await _context.Tasks
                    .Where(t => t.TaskId == id)
                    .Select(t => new TaskDto
                    {
                        TaskId = t.TaskId,
                        ProjectId = t.ProjectId,
                        TaskName = t.TaskName,
                        AssignedEmployeeName = t.AssignedEmployeeName,
                        StartDate = t.StartDate,
                        EndDate = t.EndDate,
                        TaskDetails = t.TaskDetails,
                        PercentageCompleted = t.PercentageCompleted,
                        Status = t.Status,
                    })
                    .FirstOrDefaultAsync();

                if (task == null)
                {
                    var message = "Task not found.";
                    Response.Headers.Add("X-Status-Message", message);
                    _logger.LogInformation(message);
                    return NotFound(message);
                }

                var successMessage = $"Task ID {id} retrieved successfully.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return Ok(task);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while retrieving the task.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> PostTask(TaskDto taskDto)
        {
            if (taskDto == null)
            {
                var errorMessage = "Task details cannot be empty.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogWarning(errorMessage);
                return BadRequest(errorMessage);
            }

            try
            {
                var task = new Task
                {
                    ProjectId = taskDto.ProjectId,
                    TaskName = taskDto.TaskName,
                    AssignedEmployeeName = taskDto.AssignedEmployeeName,
                    StartDate = taskDto.StartDate,
                    EndDate = taskDto.EndDate,
                    TaskDetails = taskDto.TaskDetails,
                    PercentageCompleted = taskDto.PercentageCompleted,
                    Status = taskDto.Status,
                };

                _context.Tasks.Add(task);

                var project = await _context.Projects.FindAsync(taskDto.ProjectId);
                if (project != null)
                {
                    project.TaskCounts++;
                    _context.Projects.Update(project);
                }

                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Name == taskDto.AssignedEmployeeName);
                if (employee != null)
                {
                    employee.TasksAssigned++;
                    if (taskDto.Status == "pending")
                    {
                        employee.TasksPending++;
                    }
                    _context.Employees.Update(employee);
                }

                await _context.SaveChangesAsync();

                taskDto.TaskId = task.TaskId;

                var successMessage = $"Task '{taskDto.TaskName}' has been created successfully.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return CreatedAtAction(nameof(GetTask), new { id = task.TaskId }, successMessage);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the task.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null)
                {
                    var message = "Task not found.";
                    Response.Headers.Add("X-Status-Message", message);
                    _logger.LogInformation(message);
                    return NotFound(message);
                }

                var projectId = task.ProjectId;

                _context.Tasks.Remove(task);

                var project = await _context.Projects.FindAsync(projectId);
                if (project != null)
                {
                    project.TaskCounts--;
                    _context.Projects.Update(project);
                }

                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Name == task.AssignedEmployeeName);
                if (employee != null)
                {
                    employee.TasksAssigned--;
                    if (task.Status == "pending")
                    {
                        employee.TasksPending--;
                    }
                    _context.Employees.Update(employee);
                }

                await _context.SaveChangesAsync();

                var successMessage = "Task successfully deleted.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return StatusCode(204, new { message = "Custom No Content response" });

            }
            catch (Exception ex)
            {
                var errorMessage = "Internal server error occurred while deleting the task.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] UpdateStatusDto updateStatusDto)
        {
            if (updateStatusDto == null || string.IsNullOrWhiteSpace(updateStatusDto.Status))
            {
                var errorMessage = "Invalid task status update request.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogWarning(errorMessage);
                return BadRequest(errorMessage);
            }

            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null)
                {
                    var message = "Task not found.";
                    Response.Headers.Add("X-Status-Message", message);
                    _logger.LogInformation(message);
                    return NotFound(message);
                }

                var previousStatus = task.Status;

                if (updateStatusDto.Status == "completed" && previousStatus == "pending")
                {
                    var employee = await _context.Employees
                        .FirstOrDefaultAsync(e => e.Name == task.AssignedEmployeeName);
                    if (employee != null)
                    {
                        employee.TasksCompleted++;
                        employee.TasksPending--;
                        _context.Employees.Update(employee);
                    }
                }

                task.Status = updateStatusDto.Status;
                _context.Tasks.Update(task);
                await _context.SaveChangesAsync();

                var successMessage = $"Task status updated successfully to '{updateStatusDto.Status}'.";
                Response.Headers.Add("X-Status-Message", successMessage);
                _logger.LogInformation(successMessage);
                return Ok(successMessage);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while updating the task status.";
                Response.Headers.Add("X-Error-Message", errorMessage);
                _logger.LogError(ex, errorMessage);
                return StatusCode(500, errorMessage);
            }
        }
    }
}
