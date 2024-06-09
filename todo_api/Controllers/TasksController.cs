using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using todo_api.Models;
using todo_api.Services;

namespace todo_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDataModel>>> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.FindAll();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}", Name = "GetTask")]
        public async Task<ActionResult<TaskDataModel>> GetTaskById(int id)
        {
            try
            {
                var task = await _taskService.FindOne(id);
                if (task == null)
                {
                    return NotFound();
                }
                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskDataModel>> CreateTask(TaskDataModel task)
        {
            try
            {
                var newTaskId = await _taskService.Insert(task);
                return CreatedAtRoute("GetTask", new { id = newTaskId }, task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDataModel updatedTask)
        {
            try
            {
                var existingTask = await _taskService.FindOne(id);
                if (existingTask == null)
                {
                    return NotFound();
                }

                existingTask.Title = updatedTask.Title;
                existingTask.Description = updatedTask.Description;
                existingTask.IsCompleted = updatedTask.IsCompleted;

                await _taskService.Update(existingTask);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var existingTask = await _taskService.FindOne(id);
                if (existingTask == null)
                {
                    return NotFound();
                }
                await _taskService.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
