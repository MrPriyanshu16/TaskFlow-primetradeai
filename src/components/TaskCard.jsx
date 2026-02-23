export default function TaskCard({ task, deleteTask, toggleTask, onEdit }) {
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-600",
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <h3
          className={`font-medium ${task.completed ? "text-gray-400 line-through" : ""
            }`}
        >
          {task.title}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <span
            className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]
              }`}
          >
            {task.priority}
          </span>

          {task.due_date && (
            <span className="text-sm text-gray-500">
              Due: {task.due_date}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => toggleTask(task.id)}
          className="text-indigo-600 hover:underline text-sm"
        >
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
        <button onClick={()=>onEdit(task)} className="text-blue-500 hover:underline text-sm">
          Edit
        </button>
      </div>
    </div>
  );
}

