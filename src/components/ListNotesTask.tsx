import React from 'react';
import './style/editor.css';

const ListNotesTask = ({ setView, notes, projects }) => {
  return (
    <>
      <div className="containerList">
        <div className="ListNotes">
          <h3>Lista de Notas</h3>
          <ul>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))
            ) : (
              <p>No hay notas creadas aún</p>
            )}
          </ul>
          <button className="createNote" onClick={() => setView('notes')}></button>
        </div>
        
        <div className="ListTask">
          <h3>Lista de Proyectos</h3>
          <ul className='principalListUL'>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <li className='listaPrincipal' key={index}>
                  <h4>{project.title}</h4>
                  <ul>
                    {project.tasks.map((task, i) => (
                      <li className='listyle' key={i} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No hay proyectos creados aún</p>
            )}
          </ul>
          <button className="createTaskbtn" onClick={() => setView('tasks')}></button>
        </div>
      </div>
    </>
  );
};

export default ListNotesTask;
