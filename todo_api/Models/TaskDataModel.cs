using System;

namespace todo_api.Models
{
    public class TaskDataModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
