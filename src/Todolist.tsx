import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType, TaskType } from "./App"



type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValueType
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, newValueFilter: FilterValueType) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeStatus: (todolistId: string, taskId: string) => void
  removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

  const { title, tasks , filter , todolistId, removeTask, changeFilter, addTask, changeStatus , removeTodolist } = props // пропсы

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      addTask(todolistId, newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const addTaskOnClickHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(todolistId, newTaskTitle)
      setNewTaskTitle("")
    } else {
      setError("title is required")
    }

  }

  const ChangeFilterOnClickHandler = (newValueFilter: FilterValueType) => {
    changeFilter(todolistId, newValueFilter)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }


  return (
    <div>
      <h3>{title}
        <button onClick={removeTodolistHandler}>X</button>
        </h3>
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
              removeTask(todolistId,task.id)
            }

            const onChangeHandler = () => {
              changeStatus( todolistId, task.id)


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
