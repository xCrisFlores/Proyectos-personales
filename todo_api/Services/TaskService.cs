using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using todo_api.Models;

namespace todo_api.Services
{
    public class TaskService : ITaskService
    {
        private readonly TodoDbContext _context;

        public TaskService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDataModel>> FindAll()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskDataModel> FindOne(int id)
        {
            return await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(TaskDataModel task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task.Id;
        }

        public async Task<int> Update(TaskDataModel task)
        {
            _context.Tasks.Update(task);
            return await _context.SaveChangesAsync();
        }


        public async Task<int> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                return await _context.SaveChangesAsync();
            }
            return 0; 
        }
    }
}
