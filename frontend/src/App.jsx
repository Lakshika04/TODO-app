import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import StatsBar from "./components/StatsBar";
import Alert from "./components/Alert";
import LoadingSpinner from "./components/LoadingSpinner";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/todo`);
      setTodos(response.data.todos || response.data);
    } catch (err) {
      showAlert("error", "Failed to load todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Show alert message
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  // Add or update todo
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTodo) {
        // Update existing todo
        const response = await axios.put(
          `${API_BASE}/${editingTodo._id}`,
          { ...editingTodo, ...formData }
        );
        setTodos(
          todos.map((t) => (t._id === editingTodo._id ? response.data.updateTodo : t))
        );
        showAlert("success", "Todo updated successfully!");
      } else {
        // Add new todo
        const response = await axios.post(`${API_BASE}/add`, {
          ...formData,
          completed: false,
        });
        setTodos([...todos, response.data.newTodo]);
        showAlert("success", "Todo added successfully!");
      }
      setEditingTodo(null);
    } catch (err) {
      showAlert("error", editingTodo ? "Failed to update todo" : "Failed to add todo");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle todo completion
  const handleToggle = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const response = await axios.put(`${API_BASE}/${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data.updateTodo : t)));
      showAlert("success", "Todo updated!");
    } catch (err) {
      showAlert("error", "Failed to update todo");
      console.error(err);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        setTodos(todos.filter((t) => t._id !== id));
        showAlert("success", "Todo deleted!");
      } catch (err) {
        showAlert("error", "Failed to delete todo");
        console.error(err);
      }
    }
  };

  // Edit todo
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Clear all completed todos
  const handleClearCompleted = async () => {
    const completedIds = todos.filter((t) => t.completed).map((t) => t._id);
    if (completedIds.length === 0) return;

    if (window.confirm(`Delete ${completedIds.length} completed todos?`)) {
      try {
        await Promise.all(
          completedIds.map((id) => axios.delete(`${API_BASE}/${id}`))
        );
        setTodos(todos.filter((t) => !t.completed));
        showAlert("success", "Completed todos cleared!");
      } catch (err) {
        showAlert("error", "Failed to clear completed todos");
        console.error(err);
      }
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-2xl mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            ✨ Task Manager
          </h1>
          <p className="text-gray-600">Stay organized and track your progress</p>
        </div>

        {/* Stats */}
        {!loading && <StatsBar todos={todos} />}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Todo Form */}
            <TodoForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              editingTodo={editingTodo}
              onCancel={handleCancelEdit}
            />

            {/* Filter Buttons */}
            {todos.length > 0 && (
              <div className="w-full max-w-2xl flex gap-2 mb-6 justify-center flex-wrap">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                  }`}
                >
                  All ({todos.length})
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === "active"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                  }`}
                >
                  Active ({todos.length - completedCount})
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === "completed"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                  }`}
                >
                  Completed ({completedCount})
                </button>

                {completedCount > 0 && (
                  <button
                    onClick={handleClearCompleted}
                    className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                  >
                    Clear Completed
                  </button>
                )}
              </div>
            )}

            {/* Todo List */}
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isLoading={isSubmitting}
              filter={filter}
            />
          </>
        )}
      </div>

      {/* Alert */}
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />
    </div>
  );
}