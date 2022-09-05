import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateId() {
    let s4 = () => {
      return Math.floor(Math.random() * 10)
  }
  //return id of format 00000000
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const newTask: Task = {
      id: handleCreateId(),
      title: newTaskTitle,
      isComplete: false
    }

    if (newTask.title) {
      setTasks([...tasks, newTask])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const foundTask =  tasks.find((task) => task.id == id)

    if (foundTask) {
      const boolean = (foundTask.isComplete !== true)
      foundTask.isComplete = boolean
    }

    setTasks([...tasks])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const foundTask = tasks.find((task) => task.id == id)

    if (foundTask) {
      const newTasks = tasks.filter((task) => task.id != foundTask.id)
      setTasks(newTasks)
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}