export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
}) {
  const formattedDate = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <li
      className={`bg-white border-l-4 rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex justify-between items-start gap-4 ${
        todo.completed
          ? "border-l-green-500 bg-green-50"
          : "border-l-blue-500"
      }`}
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          disabled={isLoading}
          className="w-5 h-5 accent-green-600 cursor-pointer mt-1 shrink-0 disabled:opacity-50"
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-800 wrap-break-words ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 wrap-break-words ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
          {formattedDate && (
            <p className="text-xs text-gray-400 mt-2">Created: {formattedDate}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(todo)}
          disabled={isLoading}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-all text-sm font-medium"
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          disabled={isLoading}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded transition-all text-sm font-medium"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
