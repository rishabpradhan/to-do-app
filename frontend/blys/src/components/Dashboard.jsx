import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  // Fetch user and their tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        setUser(userResponse.data);
        await fetchTasks();
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    };

    fetchData();
  }, [navigate]);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/api/tasks", { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return alert("Title is required");

    axios
      .post("http://localhost:3000/api/tasks", newTask, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks([...tasks, res.data.task]);
        setNewTask({ title: "", description: "" });
      })
      .catch((err) => alert("Error adding task"));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`, {
        withCredentials: true,
      })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch(() => alert("Error deleting task"));
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/api/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.firstname || "User"} 👋
        </h1>
        <p className="text-center mt-8 text-2xl font-bold font-serif">
          To-DO-LIST
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add task form */}
      <form
        onSubmit={handleAddTask}
        className="bg-white p-4 rounded shadow-md mb-6"
      >
        <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 mb-2 rounded"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-2 rounded"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* List of tasks */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
