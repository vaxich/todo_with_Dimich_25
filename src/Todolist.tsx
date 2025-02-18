import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"



type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (newValueFilter: FilterValueType) => void
  addTask: (newTaskTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

  const { title, tasks, removeTask, changeFilter, addTask } = props // пропсы

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const addTaskOnClickHandler = () => {
    addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  const ChangeFilterOnClickHandler = (newValueFilter: FilterValueType) => {
    changeFilter(newValueFilter)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text"
          value={newTaskTitle}
          onChange={onChangeTitleHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskOnClickHandler}>+</button>
      </div>
      <ul>
        {
          tasks.map(task => {

            const onRemoveHandler = () => {
              removeTask(task.id)
            }

            return (<li key={task.id}>
              <input type='checkbox' checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler} >x</button>
            </li>)
          }

          )
        }


      </ul>
      <div>
        <button onClick={() => ChangeFilterOnClickHandler("All")}>All</button>
        <button onClick={() => ChangeFilterOnClickHandler("Active")}>Active</button>
        <button onClick={() => ChangeFilterOnClickHandler("Completed")}>Completed</button>
      </div>
    </div>
  )
}
