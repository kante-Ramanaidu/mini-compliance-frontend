import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import "../styles/taskList.css";

function TaskList({ selectedClient, clientName }) {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("none");

  // Dynamic API URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchTasks = async () => {
    if (!selectedClient) return;
    try {
      const res = await fetch(`${API_URL}/api/clients/${selectedClient}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedClient]);

  const handleTaskAdded = () => fetchTasks();

  const handleStatusUpdate = async (taskId) => {
    try {
      await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const isOverdue = (task) =>
    task.status === "Pending" && new Date(task.due_date) < new Date();

  if (!selectedClient)
    return <div className="empty">Select a client to see tasks</div>;

  const categories = [
    "All",
    ...new Set(tasks.map((t) => t.category).filter(Boolean)),
  ];

  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === "All" || task.status === statusFilter) &&
      (categoryFilter === "All" || task.category === categoryFilter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.status !== b.status) return a.status === "Completed" ? 1 : -1;

    if (sortOption === "dueDate")
      return new Date(a.due_date) - new Date(b.due_date);

    if (sortOption === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }
    return 0;
  });

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const overdue = tasks.filter((t) => isOverdue(t)).length;

  return (
    <div className="task-container">
      <div className="header-add-btn">
        <h2 className="client-name-header">{clientName}</h2>
        <AddTaskForm selectedClient={selectedClient} onTaskAdded={handleTaskAdded} />
      </div>

      <div className="stats-container">
        <div className="stats">
          <div className="card">
            <p>Total</p>
            <h3>{total}</h3>
          </div>
          <div className="card">
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>
          <div className="card overdue">
            <p>Overdue</p>
            <h3>{overdue}</h3>
          </div>
        </div>
      </div>

      <div className="filters">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {sortedTasks.length === 0 ? (
        <p className="empty">No tasks found</p>
      ) : (
        sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${isOverdue(task) ? "overdue" : ""}`}
          >
            <div className="task-header">
              <h4>{task.title}</h4>
              {task.status === "Pending" && (
                <button
                  className="complete-btn"
                  onClick={() => handleStatusUpdate(task.id)}
                >
                  Complete
                </button>
              )}
            </div>
            <p className="task-desc">{task.description}</p>
            <div className="task-meta">
              <span className="badge category">{task.category}</span>
              <span className={`badge status ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
              <span
                className={`badge priority ${task.priority?.toLowerCase() || "medium"}`}
              >
                {task.priority || "Medium"}
              </span>
              <span>📅 {task.due_date}</span>
              {isOverdue(task) && <span className="badge overdue-badge">Overdue</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;