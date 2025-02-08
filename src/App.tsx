
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

  // const tasks : TaskType[] = [
  //   {id: '1' , title: 'HTML' , isDone: true},
  //   {id: '2' , title: 'JS' , isDone: true},
  //   {id: '3' , title: 'React' , isDone: false},
  //   {id: '3' , title: 'Redux' , isDone: false}
  // ]

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: '1', title: 'HTML', isDone: true },
    { id: '2', title: 'JS', isDone: true },
    { id: '3', title: 'React', isDone: false },
    { id: '4', title: 'Redux', isDone: false }
  ])

  const [filter, setFilter]  = useState<FilterValueType>("All")



  const removeTask = (taskId: string) => {// удаление таски
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  const changeFilter = (newValueFilter: FilterValueType ) => {
    setFilter(newValueFilter)
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
      />


    </div>
  );
}



export default App;
