//Interfaz para los metodos de la API
using System.Collections.Generic;
using System.Threading.Tasks;
//aqui usamos el esapcio de Models
using todo_api.Models;

//namespace indica el espacio de trabajo
namespace todo_api.Services
{
    public interface ITaskService
    {

        //Metodos de la interfaz, find all para GET, deberia retornar todos los objetos 
        Task<IEnumerable<TaskDataModel>> FindAll();

        //find one que recibe un id y deberia regresar un objeto
        Task<TaskDataModel> FindOne(int id);

        //insert, que recibe un objeto 
        Task<int> Insert(TaskDataModel task);

        //update que recibe un objeto
        Task Update(TaskDataModel task);

        //delete que recibe el id a eliminar
        Task Delete(int id);

        Task BackupTask(int id);
    }
}
