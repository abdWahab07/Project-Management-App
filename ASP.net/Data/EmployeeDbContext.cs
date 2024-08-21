using System.Threading.Tasks;
using Task = testing_mode.Models.Task; 
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using testing_mode.Models;
using Employees.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Employees.Data
{
    public class EmployeeDbContext : DbContext
    {
        // Constructor for EmployeeDbContext that takes DbContextOptions
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Task entity to ensure StartDate and EndDate are required
            modelBuilder.Entity<Task>()
                .Property(t => t.StartDate)
                .IsRequired(); // Make StartDate a required property

            modelBuilder.Entity<Task>()
                .Property(t => t.EndDate)
                .IsRequired(); // Make EndDate a required property

            // Configure all DateTime properties to be stored in UTC
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties().Where(p => p.ClrType == typeof(DateTime)))
                {
                    property.SetValueConverter(new ValueConverter<DateTime, DateTime>(
                        v => DateTime.SpecifyKind(v, DateTimeKind.Utc), // Convert DateTime to UTC when saving
                        v => DateTime.SpecifyKind(v, DateTimeKind.Utc))); // Convert DateTime to UTC when reading
                }
            }
        }

        // DbSet properties for the entities in the database
        public DbSet<Employee> Employees { get; set; } // Table for Employee entities
        public DbSet<Project> Projects { get; set; } // Table for Project entities
        public DbSet<Task> Tasks { get; set; } // Table for Task entities
        public DbSet<User> Users { get; set; } // Table for User entities
        public DbSet<Report> Reports { get; set; } // Table for Report entities
        public DbSet<Announcement> Announcements { get; set; } // Table for Announcement entities
    }
}
