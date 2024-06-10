using System.Collections.Generic;
using System.Threading.Tasks;
using todo_api.Models;

namespace todo_api.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDataModel>> FindAll();
        Task<TaskDataModel> FindOne(int id);
        Task<int> Insert(TaskDataModel task);
        Task Update(TaskDataModel task);
        Task Delete(int id);
    }
}
