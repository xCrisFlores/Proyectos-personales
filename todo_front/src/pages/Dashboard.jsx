import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import completeImage from '../assets/complete.png';
import incompleteImage from '../assets/uncomplete.png';
import deleteImage from '../assets/delete.png'; 
import editImage from '../assets/edit.png'; 
import '../styles/styles.css'; 
import { useTaskContext } from '../TaskContext';

function Dashboard() {
  const { tasks, setTasks } = useTaskContext();
  const [showAlert, setShowAlert] = useState(false); 
  const [deletedTaskId, setDeletedTaskId] = useState(null); 


  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5074/api/task');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCompleteTask = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) {
      console.error('Task not found');
      return;
    }

    const updatedTask = { ...taskToUpdate, isCompleted: taskToUpdate.isCompleted ? 0 : 1 };

    try {
      const response = await fetch(`http://localhost:5074/api/task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleBackupTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:5074/api/task/backup/${id}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to backup task');
        }

        const data = await response.json();
        console.log(data.message);
        // Aquí puedes actualizar el estado o hacer cualquier otra acción necesaria
    } catch (error) {
        console.error('Error backing up task:', error);
    }
};


  const handleDeleteTask = async (id) => {

    var del = id;
    try {
      const response = await fetch(`http://localhost:5074/api/task/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setDeletedTaskId(del);
      setShowAlert(true); 
      fetchTasks();
    
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    const updatedTask = { ...task, isCompleted: tasks.find(t => t.id === task.id)?.isCompleted };
    setTasks(tasks => tasks.map(t => t.id === task.id ? updatedTask : t)); 
  };

  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '5em' }}>TO-DO APP</p>
      </div>

      <div>
        {tasks.map(task => (
            <table>
            <tr className='trs'>
              <th key={task.id}></th>
            </tr>
            </table>
        ))}
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>¡Se eliminó una tarea!</p>
          <button onClick={() => handleBackupTask(deletedTaskId)} className='form_btn'>
            Recuperar tarea
          </button>
          <button onClick={() => setShowAlert(false)} className='form_btn'>
            Cerrar
          </button>
        </div>
      )}


      <div className="tasks-container">
        {tasks.map(task => (
          <div key={task.id} className="task">
            <p className='task_title'>{task.title}</p>
            <p className='primary_lbl'>{task.description}</p>
            <p className='primary_lbl'>Tipo de tarea: {task.tipo === 2 ? 'Programacion': 'Ejercicio'}</p>
            <p className='primary_lbl'>{task.isCompleted ? 'Completada' : 'No completada'}</p>
            <p className='primary_lbl'>
              Creada el día: {task.createdAt.split('T')[0]}
            </p>
            <div className="btn_div">
              <button className="primary_btn" onClick={() => handleCompleteTask(task.id)}>
                <img
                  src={task.isCompleted ? completeImage : incompleteImage}
                  alt={task.isCompleted ? 'Completado' : 'Incompleto'}
                />
              </button>
              <button className="delete_btn" onClick={() => handleDeleteTask(task.id)}>
                <img
                  src={deleteImage}
                  alt="Eliminar"
                />
              </button>
              <Link to={`/editar/${task.id}`} onClick={() => handleEditTask(task)} className="edit_btn">
                <img src={editImage} alt="Editar" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='new_container'>
        <p className='primary_lbl'>¿Algo por hacer? Crea una nueva tarea aquí</p>
        <Link to="alta" className='form_btn'><p className='primary_lbl'>Crear tarea</p></Link>
      </div>
    </div>
  );
}

export default Dashboard;
