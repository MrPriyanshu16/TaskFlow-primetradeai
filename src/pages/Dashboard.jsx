import { useState, useEffect } from "react";
import API from "../api/axios.js";
import Navbar from "../components/NavBar.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskForm from "../components/TaskForm.jsx";
export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [editingTask, setEditingTask] = useState(null);
  //console.log("Current tasks: ", tasks);
  useEffect(() => {
    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }

    if (sortBy === "due") {
      return new Date(a.due_date || 0) - new Date(b.due_date || 0);
    }

    return 0;
  });

  function handleEdit(task) {
    setEditingTask(task);
  }

  async function fetchTasks() {
    try {
      const res = await API.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredTasks =
    tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      });

  async function addTask(newTask) {
    try {
      await API.post("/tasks/", newTask);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }
  async function deleteTask(id) {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }
  async function toggleTask(id) {
    try {
      await API.put(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }
  if (loading) {
    return <div className="text-center mt-10">
      Loading Tasks...
    </div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Task Manager
        </h2>

        <TaskForm addTask={addTask} />

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex gap-2">
            {["all", "completed", "pending"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg capitalize transition ${filter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="default">Default</option>
            <option value="priority">Sort by Priority</option>
            <option value="due">Sort by Due Date</option>
          </select>
        </div>
        <TaskList
          tasks={sortedTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          onEdit={handleEdit}
        />

        {editingTask && (
          <div className="fixed inset-0 bg-blue-200 bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 space-y-4">
              <h2 className="text-lg font-semibold">Edit Task</h2>

              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <select
                value={editingTask.priority}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, priority: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <input
                type="date"
                value={editingTask.due_date || ""}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, due_date: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await API.put(`/tasks/${editingTask.id}`, editingTask);
                    setEditingTask(null);
                    fetchTasks();
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}