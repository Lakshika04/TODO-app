import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
  filter,
}) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">
          {todos.length === 0
            ? "No todos yet. Create one to get started! 🚀"
            : `No ${filter} todos. Great job! ✨`}
        </p>
      </div>
    );
  }

  return (
    <ul className="w-full max-w-2xl space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          isLoading={isLoading}
        />
      ))}
    </ul>
  );
}
