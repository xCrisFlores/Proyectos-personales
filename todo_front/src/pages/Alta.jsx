import React, { useState } from 'react';
import '../styles/styles.css'; 

function Alta() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNewTask = async () => {
    try {
      const newTask = {
        title: title,
        description: description,
        createdAt: new Date().toISOString()
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

      window.alert('¡La tarea se ha creado correctamente!');

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Error creating task:', error);
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
      <button className='form_btn' onClick={handleNewTask}><p className='primary_lbl'>Crear tarea</p></button>
    </div>
  );
}

export default Alta;
