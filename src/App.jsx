import { TaskContext } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import { useContext } from "react";
import TaskList from "./components/TaskList";

function App() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center tracking-wide text-gray-600">To-Do App</h1>
      <TaskForm/>
      <TaskList />
    </section>
  );
}

export default App
