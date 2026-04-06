import { useState, useEffect } from "react";

export default function App() {
const [task, setTask] = useState("");
const [todos, setTodos] = useState([]);

useEffect(() => {
  const savedTodos = localStorage.getItem("todos");
  if(savedTodos) {
    setTodos(JSON.parse(savedTodos))
  }
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

const addTask = () => {
  if(task.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: task,
    completed: false
  }

  setTodos([...todos, newTask]);
  setTask("");
}

const toggleTask = (id) => { 
  const updated = todos.map((todo) => 
     todo.id === id ? {...todos, completed: todo.id === id} : todo);
  setTodos(updated);
};

const deleteTask = (id) => {
  const filetered = todos.filter((todo) => todo.id !== id);
  setTodos(filetered);
};
 
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-2xl w-96 shadow-lg">

        {/* Title */}
        <h1 className="text-white text-2xl font-bold mb-4 text-center">
          To-Do App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
          />

          <button
            onClick={addTask}
            className="bg-blue-500 px-4 rounded-lg text-white hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {todos.length === 0 && (
            <p className="text-gray-400 text-center">No tasks yet</p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
            >
              <span
                onClick={() => toggleTask(todo.id)}
                className={`cursor-pointer flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-white"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTask(todo.id)}
                className="text-red-400 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}