
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

 

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: 'HTML', isDone: true },
    { id: crypto.randomUUID(), title: 'JS', isDone: true },
    { id: crypto.randomUUID(), title: 'React', isDone: false },
    { id: crypto.randomUUID(), title: 'Redux', isDone: false }
  ])

  const [filter, setFilter]  = useState<FilterValueType>("All")



  const removeTask = (taskId: string) => {// удаление таски
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  const changeFilter = (newValueFilter: FilterValueType ) => {
    setFilter(newValueFilter)
  }

  const addTask = (newTaskTitle: string)  => {
    let newTask = { 
      id: crypto.randomUUID(), 
      title: newTaskTitle , 
      isDone: false}
      
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)

  }

let taskForTodolist = tasks;
if (filter === "Active") {
  taskForTodolist = tasks.filter(task => task.isDone === false)
}
if (filter === "Completed") {
  taskForTodolist = tasks.filter(task => task.isDone === true)
}
  


  return (
    <div className="App">
      <Todolist
        title='что учить'
        tasks={taskForTodolist}
        removeTask={removeTask}
        changeFilter = {changeFilter}
        addTask = {addTask}
      />


    </div>
  );
}



export default App;
