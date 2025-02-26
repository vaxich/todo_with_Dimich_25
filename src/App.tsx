
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type todolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type FilterValueType = "All" | "Active" | "Completed"

function App() {

  let todolistId1 = crypto.randomUUID()
  let todolistId2 = crypto.randomUUID()

  const [todolists, setTodolists] = useState<todolistType[]>([
    { id: todolistId1, title: "what to learn", filter: "All" },
    { id: todolistId2, title: "what to buy", filter: "All" }
  ])

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: crypto.randomUUID(), title: 'HTML', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
      { id: crypto.randomUUID(), title: 'Redux', isDone: false }
    ],
    [todolistId2]: [
      { id: crypto.randomUUID(), title: 'milk', isDone: true },
      { id: crypto.randomUUID(), title: 'bread', isDone: true },
      { id: crypto.randomUUID(), title: 'tea', isDone: false },
      { id: crypto.randomUUID(), title: 'sigi', isDone: false }
    ],
  })

  const removeTask = (todolistId: string, taskId: string) => {// удаление таски
    let newTasks = tasks[todolistId]
    let filteredTasks = newTasks.filter(task => task.id !== taskId)
    tasks[todolistId] = filteredTasks
    setTasks({ ...tasks })
    //setTasks(tasks.filter(task => task.id !== taskId))
  }

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasks[todolistId]
    setTasks({...tasks})
  }


  const changeFilter = (todolistId: string, newValueFilter: FilterValueType) => {
    let newState = todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter: newValueFilter } : { ...todolist })
    setTodolists(newState)
  }

  const addTask = (todolistId: string, newTaskTitle: string) => {
    let newTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      isDone: false
    }
    let tasksfilter = tasks[todolistId]
    let newTasks = [newTask, ...tasksfilter]
    tasks[todolistId] = newTasks
    setTasks({ ...tasks })
  }

  const changeStatus = (todolistId: string, taskId: string) => {
    let tasksfilter = tasks[todolistId]
    let task = tasksfilter.find(task => task.id === taskId)
    if (task) {
      task.isDone = !task.isDone
      setTasks({ ...tasks })
    }
    // const newState = tasks.map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
    // setTasks(newState)
  }




  return (
    <div className="App">
      {todolists.map(todolist => {

        let taskForTodolist = tasks[todolist.id];

        if (todolist.filter === "Active") {
          taskForTodolist = taskForTodolist.filter(task => task.isDone === false)
        }
        if (todolist.filter === "Completed") {
          taskForTodolist = taskForTodolist.filter(task => task.isDone === true)
        }

        return (
          <Todolist
            key={todolist.id}
            todolistId={todolist.id}
            title={todolist.title}
            tasks={taskForTodolist}
            filter={todolist.filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeTodolist={removeTodolist}
          />
        )
      })}



    </div>
  );
}



export default App;
