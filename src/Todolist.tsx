import {  TaskType } from "./App"



type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props: TodolistPropsType) => {

 //{title , task} = props

    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input type="text" />
          <button>+</button>
        </div>
        <ul>
          <li><input type='checkbox' checked ={props.tasks[0].isDone} /><span>{props.tasks[0].title}</span></li>
          <li><input type='checkbox' checked ={props.tasks[1].isDone} /><span>{props.tasks[1].title}</span></li>
          <li><input type='checkbox' checked ={props.tasks[2].isDone} /><span>{props.tasks[2].title}</span></li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Complited</button>
        </div>
      </div>
    )
  }
  