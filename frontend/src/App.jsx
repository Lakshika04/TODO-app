import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos
  const getTodo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/todo`);
      setTodos(response.data.todos || response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  // Add todo via API
  const addTodo = async () => {
    if (task.trim() === "") return;
    try {
      const response = await axios.post(`${API_BASE}/add`, { title: task, description: description || "", completed: false });
      setTodos([...todos, response.data]);
      setTask("");
      setDescription("");
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  // Toggle todo via API
  const toggleTodo = async (index) => {
    const todo = todos[index];
    try {
      const response = await axios.put(`${API_BASE}/${todo._id}`, { ...todo, completed: !todo.completed });
      const updatedTodos = todos.map((t, i) => (i === index ? response.data : t));
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  // Delete todo via API
  const deleteTodo = async (index) => {
    const todo = todos[index];
    try {
      await axios.delete(`${API_BASE}/${todo._id}`);
      setTodos(todos.filter((_, i) => i !== index));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="min-h-screen  from-indigo-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📝 My To-Do App</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}

      <div className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a task title..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64"
        />
        <input
          type="text"
          placeholder="Enter a description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64"
        />
        <button
          onClick={addTodo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-sm space-y-3">
        {todos.map((todo, index) => (
          <li
            key={todo._id}
            className={`bg-white shadow-md rounded-lg px-4 py-3 flex justify-between items-center transition-all ${
              todo.completed ? "opacity-70 bg-green-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />
              <div>
                <span
                  className={`text-gray-700 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>
                {todo.description && (
                  <p className="text-sm text-gray-500">{todo.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !loading && (
        <p className="text-gray-500 mt-8">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}