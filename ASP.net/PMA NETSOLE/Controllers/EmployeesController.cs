using Microsoft.AspNetCore.Mvc;
using Employees.Data;
using Employees.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testing_mode.DTOs;
using testing_mode.Models;
using BCrypt.Net;
using testing_mode.Services; // Ensure this namespace contains your ILoggingService
using Newtonsoft.Json; // Ensure you have this using directive for JsonConvert

namespace testing_mode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly ILoggingService _loggingService;

        public EmployeesController(EmployeeDbContext context, ILoggingService loggingService)
        {
            _context = context;
            _loggingService = loggingService;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeWithTaskInfoDto>>> GetEmployees()
        {
            try
            {
                var employees = await _context.Employees
                    .Select(e => new EmployeeWithTaskInfoDto
                    {
                        EmployeeId = e.EmployeeId,
                        Name = e.Name,
                        Designation = e.Designation,
                        Experience = e.Experience,
                        Description = e.Description,
                        PastDesignation = e.PastDesignation,
                        TotalTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name),
                        PendingTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "pending"),
                        CompletedTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "completed")
                    })
                    .ToListAsync();

                return Ok(employees);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving employees.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // GET: api/Employees/username/{username}
        [HttpGet("username/{username}")]
        public async Task<ActionResult<EmployeeWithTaskInfoDto>> GetEmployeeByUsername(string username)
        {
            try
            {
                var employee = await _context.Employees
                    .Where(e => e.Username == username)
                    .Select(e => new EmployeeWithTaskInfoDto
                    {
                        EmployeeId = e.EmployeeId,
                        Name = e.Name,
                        Designation = e.Designation,
                        Experience = e.Experience,
                        Description = e.Description,
                        PastDesignation = e.PastDesignation,
                        TotalTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name),
                        PendingTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "pending"),
                        CompletedTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "completed")
                    })
                    .FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving employee by username.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // GET: api/Employees/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeWithTaskInfoDto>> GetEmployeeById(int id)
        {
            try
            {
                var employee = await _context.Employees
                    .Where(e => e.EmployeeId == id)
                    .Select(e => new EmployeeWithTaskInfoDto
                    {
                        EmployeeId = e.EmployeeId,
                        Name = e.Name,
                        Designation = e.Designation,
                        Experience = e.Experience,
                        Description = e.Description,
                        PastDesignation = e.PastDesignation,
                        TotalTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name),
                        PendingTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "pending"),
                        CompletedTasks = _context.Tasks.Count(t => t.AssignedEmployeeName == e.Name && t.Status == "completed")
                    })
                    .FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while retrieving employee by ID.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromForm] CreateEmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = JsonConvert.SerializeObject(ModelState);
                _loggingService.LogError("Model validation failed.", new Exception(errorMessage));
                return BadRequest(ModelState);
            }

            try
            {
                var employee = new Employee
                {
                    Name = employeeDto.Name,
                    Designation = employeeDto.Designation,
                    Experience = employeeDto.Experience,
                    Description = employeeDto.Description,
                    PastDesignation = employeeDto.PastDesignation,
                    Username = employeeDto.Username,
                    Login = employeeDto.Login,
                    Password = BCrypt.Net.BCrypt.HashPassword(employeeDto.Password),
                    Gmail = employeeDto.Gmail,
                    TasksAssigned = employeeDto.TasksAssigned,
                    TasksPending = employeeDto.TasksPending,
                    TasksCompleted = employeeDto.TasksCompleted
                };

                _context.Employees.Add(employee);

                var user = new User
                {
                    Username = employeeDto.Username,
                    Password = employee.Password,
                    Email = employeeDto.Gmail
                };
                _context.Users.Add(user);

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, employee);
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while posting a new employee.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // PUT: api/Employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromForm] CreateEmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
            {
                var errorMessage = JsonConvert.SerializeObject(ModelState);
                _loggingService.LogError("Model validation failed.", new Exception(errorMessage));
                return BadRequest(ModelState);
            }

            try
            {
                var employee = await _context.Employees.FindAsync(id);

                if (employee == null)
                {
                    return NotFound();
                }

                employee.Name = employeeDto.Name;
                employee.Designation = employeeDto.Designation;
                employee.Experience = employeeDto.Experience;
                employee.Description = employeeDto.Description;
                employee.PastDesignation = employeeDto.PastDesignation;
                employee.Username = employeeDto.Username;
                employee.Login = employeeDto.Login;
                employee.Password = BCrypt.Net.BCrypt.HashPassword(employeeDto.Password);
                employee.Gmail = employeeDto.Gmail;
                employee.TasksAssigned = employeeDto.TasksAssigned;
                employee.TasksPending = employeeDto.TasksPending;
                employee.TasksCompleted = employeeDto.TasksCompleted;

                _context.Entry(employee).State = EntityState.Modified;

                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == employee.Username);
                if (user != null)
                {
                    user.Password = employee.Password;
                    user.Email = employee.Gmail;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _loggingService.LogError("Concurrency error occurred while updating employee.", ex);
                    return StatusCode(500, "Internal server error.");
                }
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while updating employee.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        // DELETE: api/Employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee == null)
                {
                    return NotFound();
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Employee deleted successfully." });
            }
            catch (Exception ex)
            {
                _loggingService.LogError("Error occurred while deleting employee.", ex);
                return StatusCode(500, "Internal server error.");
            }
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
