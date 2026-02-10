import { useState } from "react";

export default function TodoForm({ onSubmit, isLoading, editingTodo, onCancel }) {
  const [title, setTitle] = useState(editingTodo?.title || "");
  const [description, setDescription] = useState(editingTodo?.description || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setError("");
    onCancel?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editingTodo ? "✏️ Edit Todo" : "➕ Add New Todo"}
      </h2>

      {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="100"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/100</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (optional)
          </label>
          <textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="500"
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">{description.length}/500</p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-all font-medium"
          >
            {isLoading ? "Processing..." : editingTodo ? "Update Todo" : "Add Todo"}
          </button>
          {editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-all font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
