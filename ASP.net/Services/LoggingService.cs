using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading.Tasks;

namespace testing_mode.Services
{
    public interface ILoggingService
    {
        void LogError(string message, Exception ex);
    }

    public class LoggingService : ILoggingService
    {
        private readonly ILogger<LoggingService> _logger;

        public LoggingService(ILogger<LoggingService> logger)
        {
            _logger = logger;
        }

        public void LogError(string message, Exception ex)
        {
            // Log to the built-in logger (Serilog or any other configured logger)
            _logger.LogError(ex, message);

            // If you still want to manually log to a specific file, you can do so here
            // Serilog already handles file logging, but if you want to manually write
            // to a separate file, you can uncomment and use the method below.
            // WriteLogToFile("ErrorLog", message, ex);
        }

        // Optional: Manual file logging if needed
        private void WriteLogToFile(string fileName, string message, Exception ex)
        {
            var logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Logs");

            // Ensure the log directory exists
            if (!Directory.Exists(logDirectory))
            {
                Directory.CreateDirectory(logDirectory);
            }

            // Format the log entry
            var logEntry = $"Timestamp: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}\n";
            logEntry += $"Title: {message}\n";
            logEntry += $"Exception: {ex}\n";
            logEntry += new string('-', 80) + "\n";

            // Determine file path
            var filePath = Path.Combine(logDirectory, $"{fileName}_{DateTime.UtcNow:yyyyMMdd}.log");

            // Write log entry to the file
            File.AppendAllText(filePath, logEntry);
        }
    }
}
