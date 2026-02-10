export default function Alert({ type, message, onClose }) {
  if (!message) return null;

  const bgColor = type === "error" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";
  const iconColor = type === "error" ? "text-red-400" : "text-green-400";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} border rounded-lg p-4 shadow-lg max-w-sm animate-fadeIn`}
    >
      <div className="flex gap-3">
        <span className={`text-xl ${iconColor}`}>
          {type === "error" ? "❌" : "✅"}
        </span>
        <div className="flex-1">
          <p className={`${textColor} font-medium`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70 font-bold`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
