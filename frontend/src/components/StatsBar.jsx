export default function StatsBar({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full max-w-2xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 mb-8 text-white">
      <h2 className="text-lg font-bold mb-4">📊 Progress</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-sm opacity-90">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{completed}</p>
          <p className="text-sm opacity-90">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{pending}</p>
          <p className="text-sm opacity-90">Pending</p>
        </div>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs mt-2 text-center opacity-90">{percentage}% Complete</p>
    </div>
  );
}
