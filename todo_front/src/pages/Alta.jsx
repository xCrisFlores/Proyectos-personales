import React, { useState } from 'react';
import '../styles/styles.css'; 

function Alta() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState(2);
  const [showAlert, setShowAlert] = useState(false);

  const handleNewTask = async () => {
    try {
      const newTask = {
        title: title,
        description: description,
        createdAt: new Date().toISOString(),
        tipo: tipo
      };

      const response = await fetch('http://localhost:5074/api/task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setShowAlert(true); 

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (

    <div className='body_container'>
      
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '5em' }}>Nueva tarea</p>
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>¡Se ha creado una tarea!</p>
          <button onClick={() => setShowAlert(false)} className='form_btn'>
            Cerrar
          </button>
        </div>
      )}
   
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
        <p className='primary_lbl'>Tipo</p>
        <select className='primary_inp' value={tipo} onChange={(e) => setTipo(parseInt(e.target.value))}>
          <option value="1">Ejercicio</option>
          <option value="2">Programacion</option>
        </select>
        <button className='form_btn' onClick={handleNewTask}><p className='primary_lbl'>Crear tarea</p></button>
      </div>
    </div>
  );
}

export default Alta;
