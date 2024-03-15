import Header from "./components/Header";
import { TaskList } from "./components/TaskList";
function App() {

  const tasks = [{ description: "Do the dishes" }, { description: "Do the ADA lab" }];
 

  return (
    <div>
      <Header />
      <TaskList list={tasks}/>
    </div>
  )
}

export default App
