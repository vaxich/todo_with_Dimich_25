
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {

const tasks1 : TaskType[] = [
  {id: '1' , title: 'HTML' , isDone: true},
  {id: '2' , title: 'JS' , isDone: true},
  {id: '3' , title: 'React' , isDone: false}
]

const tasks2 : TaskType[]= [
  {id: '6' , title: 'хлеб' , isDone: true},
  {id: '7' , title: 'молоко' , isDone: true},
  {id: '8' , title: 'пиво' , isDone: false}
]

  return (
    <div className="App">
      <Todolist title = 'что учить' tasks = {tasks1}/>
      <Todolist  title = 'что купить' tasks = {tasks2}/>
      
    </div>
  );
}



export default App;
