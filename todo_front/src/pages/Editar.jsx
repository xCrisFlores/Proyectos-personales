import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css'; 

function Editar() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5074/api/task/${taskId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const taskData = await response.json();
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setDate(taskData.date);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSaveChanges = async (title, description, date) => {
    try {
      const response = await fetch(`http://localhost:5074/api/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, title, description, date }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      window.alert('¡La tarea se ha editado correctamente!');
  
      setTask({ ...task, title, description, date });
  
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  return (
    <div className='form_style'>
      <p className='primary_lbl'>Titulo</p>
      <input
        className='primary_inp'
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='primary_lbl'>Descripcion</p>
      <input
        className='primary_inp'
        type="text" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p className='primary_lbl'>Fecha</p>
      <input
        className='primary_inp'
        type="date" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className='form_btn' onClick={() => handleSaveChanges( title, description, date)}>
        <p className='primary_lbl'>Guardar cambios</p>
      </button>
    </div>
  );
}

export default Editar;
