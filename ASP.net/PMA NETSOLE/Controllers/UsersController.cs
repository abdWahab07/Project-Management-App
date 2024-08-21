using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Employees.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using testing_mode.DTOs;
using testing_mode.Models;

namespace testing_mode.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly ILogger<UsersController> _logger;

        public UsersController(EmployeeDbContext context, IConfiguration configuration, ILogger<UsersController> logger)
        {
            _context = context;
            _secretKey = configuration["Jwt:SecretKey"];
            _issuer = configuration["Jwt:Issuer"];
            _audience = configuration["Jwt:Audience"];
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(RegisterUserDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Username) || string.IsNullOrEmpty(userDto.Password) || string.IsNullOrEmpty(userDto.Email))
                return BadRequest(new { message = "Username, password, and email are required." });

            if (await _context.Users.AnyAsync(u => u.Username == userDto.Username))
                return Conflict(new { message = "Username already exists." });

            var user = new User
            {
                Username = userDto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Email = userDto.Email
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(LoginUserDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return Unauthorized(new { message = "Invalid username or password." });

            var token = GenerateJwtToken(user);

            return Ok(new { token, username = user.Username });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        [Authorize]
        [HttpGet("verify-token")]
        public IActionResult VerifyToken()
        {
            // If the request reaches this point, the token is valid
            return Ok(true);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
