using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace todo_api.Models
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
           
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole(); 
            });

           
            var logger = loggerFactory.CreateLogger<TodoDbContext>();

          
            logger.LogInformation("Estableciendo conexión con la base de datos...");
        }

        public DbSet<TaskDataModel> Tasks { get; set; }
        public DbSet<BackupTasks> BackupTasks { get; set; }
    }
}
