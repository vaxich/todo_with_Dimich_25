import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"



type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValueType
  removeTask: (taskId: string) => void
  changeFilter: (newValueFilter: FilterValueType) => void
  addTask: (newTaskTitle: string) => void
  changeStatus: (taskId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

  const { title, tasks , filter , removeTask, changeFilter, addTask, changeStatus } = props // пропсы

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const addTaskOnClickHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle)
      setNewTaskTitle("")
    } else {
      setError("title is required")
    }

  }

  const ChangeFilterOnClickHandler = (newValueFilter: FilterValueType) => {
    changeFilter(newValueFilter)
  }


  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          type="text"
          value={newTaskTitle}
          onChange={onChangeTitleHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskOnClickHandler}>+</button>
        {error && <div className="error-message">{error} </div>}
      </div>
      <ul>
        {
          tasks.map(task => {

            const onRemoveHandler = () => {
              removeTask(task.id)
            }

            const onChangeHandler = () => {
              changeStatus(task.id)


            }


            return (<li className={ task.isDone ? "is-done" : ""} key={task.id}>
              <input
                type='checkbox'
                checked={task.isDone}
                onChange={onChangeHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler} >x</button>
            </li>)
          }

          )
        }


      </ul>
      <div>
        <button className={ filter === "All" ? "active-filter" : ""} onClick={() => ChangeFilterOnClickHandler("All")}>All</button>
        <button className={ filter === "Active" ? "active-filter" : ""} onClick={() => ChangeFilterOnClickHandler("Active")}>Active</button>
        <button className={ filter === "Completed" ? "active-filter" : ""} onClick={() => ChangeFilterOnClickHandler("Completed")}>Completed</button>
      </div>
    </div>
  )
}
