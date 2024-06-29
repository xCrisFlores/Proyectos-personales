using MySql.Data.MySqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
//usando el espacio models
using todo_api.Models;

//declarando el espacio services
namespace todo_api.Services
{

    //heredar metodos de la interfaz
    public class TaskService : ITaskService
    {
        //reconocer el contexto de la bd de forma privada en la clase
        private readonly TodoDbContext _context;

        //constructor de l clase inicializando el contexto
        public TaskService(TodoDbContext context)
        {
            _context = context;
        }

        //metodo para get de todos los elementos con la funcion find all
        public async Task<IEnumerable<TaskDataModel>> FindAll()
        {

            //retornar una lista del objeto tasks
            return await _context.Tasks.ToListAsync();
        }

       public async Task BackupTask(int id)
        {
            var connectionString = _context.Database.GetDbConnection().ConnectionString;

            using (var con = new MySqlConnection(connectionString))
            {
                try
                {
                    await con.OpenAsync();
                    using (var cmd = new MySqlCommand("backup", con))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);

                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                catch (Exception ex)
                {
                    // Manejar el error de conexión o ejecución
                    Console.WriteLine($"Error executing stored procedure: {ex.Message}");
                    throw;
                }
                finally
                {
                    await con.CloseAsync();
                }
            }
        }

        //metodo get para un elemento con find one, con parametro id
        public async Task<TaskDataModel> FindOne(int id)
        {

            //retorna la coincidencia del parametro con el elemento de la lista tasks
            return await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
        }

        //metodo post usando insert que recibe el objeto task
        public async Task<int> Insert(TaskDataModel task)
        {

            //usando add para añadir a la lista un objeto task
            _context.Tasks.Add(task);
            //guardando los cambios
            await _context.SaveChangesAsync();
            //retornando el id
            return task.Id;
        }

        //recibiendo un objeto, y actualizando con update
        public async Task Update(TaskDataModel task)
        {
            //actualizar la lista y guardar cambios
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        //recibiendo un id, para eliminarlo con delete
        public async Task Delete(int id)
        {

            //verificar que existe el registro
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {

                //si se encuentra eliminar y guardar los cambios
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}
