import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css'; 

function Editar() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

        // Formatear la fecha para que sea compatible con el input type="date"
        const formattedDate = taskData.createdAt.split('T')[0]; // Obtener solo la parte de la fecha
        setDate(formattedDate);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSaveChanges = async () => {
    try {
      const formattedDate = new Date(date); // No es necesario formatear la fecha a ISO
      const response = await fetch(`http://localhost:5074/api/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, title, description, date: formattedDate.toISOString(), isCompleted: task.isCompleted }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      setShowAlert(true);
  
      // Actualizamos la tarea en el estado sin modificar IsCompleted
      setTask(prevTask => ({ ...prevTask, title, description, date }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  return (
    <div className='body_container'>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '5em' }}>Edicion de tarea</p>
      </div>


      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>¡Se ha editado la tarea!</p>
          <button onClick={() => setShowAlert(false)} className='form_btn'>
            Cerrar
          </button>
        </div>
      )}
      
      <div className='form_style'>
        <p className='primary_lbl'>Título</p>
        <input
          className='primary_inp'
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className='primary_lbl'>Descripción</p>
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
        <button className='form_btn' onClick={handleSaveChanges}>
          <p className='primary_lbl'>Guardar cambios</p>
        </button>
      </div>
    </div>
  );
}

export default Editar;
