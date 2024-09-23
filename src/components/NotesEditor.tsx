import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ListNotesTask from './ListNotesTask';
import './style/editor.css';

const NotesApp = () => {
  const [view, setView] = useState('list'); // Estado para controlar qué vista mostrar
  const [markdownText, setMarkdownText] = useState('');
  const [notes, setNotes] = useState([]); // Almacenar las notas
  const [tasks, setTasks] = useState([]); // Almacenar las tareas
  const [taskInput, setTaskInput] = useState('');
  const [projectTitle, setProjectTitle] = useState(''); // Título del proyecto
  const [projects, setProjects] = useState([]); // Almacenar los proyectos

  // Manejar la creación de una nueva nota
  const handleSaveNote = () => {
    setNotes([...notes, markdownText]);
    setMarkdownText('');
    setView('list'); // Volver a la lista después de crear la nota
  };
 // Guardar conjunto de tareas bajo un proyecto
 
  // Manejar la creación de una nueva tarea
  const handleTaskAdd = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  // Guardar conjunto de tareas bajo un proyecto
  const handleSaveProject = () => {
    if (projectTitle.trim() !== '' && tasks.length > 0) {
      const newProject = {
        title: projectTitle,
        tasks: [...tasks],
      };
      setProjects([...projects, newProject]);
      setTasks([]); // Limpiar las tareas
      setProjectTitle(''); // Limpiar el título del proyecto
    }
  };

  // Marcar tarea como completada
  const handleTaskToggle = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Eliminar una tarea
  const handleTaskDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  return (
    <div className="container">
      <div className="containerLista">
        <ListNotesTask setView={setView} notes={notes} projects={projects} />
      </div>

      <div className="notasEditor">
        <h1>App de Notas y Tareas</h1>
        {view === 'notes' && (
          <div>
            <h2>Crear Nota</h2>
            <textarea 
              value={markdownText} 
              onChange={(e) => setMarkdownText(e.target.value)} 
              placeholder="Escribe tu nota en Markdown" 
              rows="10" 
              cols="50"
            />
            <div>
              <h3>Vista previa de la nota:</h3>
              <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
            <button onClick={handleSaveNote}>Guardar Nota</button>
          </div>
        )}

        {view === 'tasks' && (
          <div>
            <h2>Nuevo Proyecto</h2>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Título del proyecto"
            />
            <h3>Tareas</h3>
            <div>
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Nueva tarea"
              />
              <button onClick={handleTaskAdd}>Añadir tarea</button>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(index)}
                  />
                  {task.text}
                  <button onClick={() => handleTaskDelete(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <button onClick={handleSaveProject}>Guardar Proyecto</button>
          </div>
        )}

        <div>
          <h2>Proyectos Guardados</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <h3>{project.title}</h3>
                <ul>
                  {project.tasks.map((task, i) => (
                    <li key={i} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
