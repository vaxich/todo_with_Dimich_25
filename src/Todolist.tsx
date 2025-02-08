import {  FilterValueType, TaskType } from "./App"



type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newValueFilter: FilterValueType) => void
}

export const Todolist = (props: TodolistPropsType) => {

 const {title , tasks, removeTask , changeFilter} = props

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input type="text" />
          <button>+</button>
        </div>
        <ul>
      {
        tasks.map( task => 
          <li>
            <input type='checkbox' checked ={task.isDone} />
            <span>{task.title}</span>
            <button onClick={ () => removeTask(task.id)}>x</button></li>
        )
      }

          {/* <li><input type='checkbox' checked ={props.tasks[0].isDone} /><span>{props.tasks[0].title}</span></li>
          <li><input type='checkbox' checked ={props.tasks[1].isDone} /><span>{props.tasks[1].title}</span></li>
          <li><input type='checkbox' checked ={props.tasks[2].isDone} /><span>{props.tasks[2].title}</span></li> */}
        </ul>
        <div>
          <button onClick={ () => changeFilter("All")}>All</button>
          <button onClick={ () => changeFilter("Active")}>Active</button>
          <button onClick={ () => changeFilter("Completed")}>Completed</button>
        </div>
      </div>
    )
  }
  