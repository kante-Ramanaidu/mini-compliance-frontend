import { useState } from "react";
import "../styles/taskList.css";

function AddTaskForm({ selectedClient, onTaskAdded }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    status: "Pending",
    priority: "Medium",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.due_date) {
      alert("Title and Due Date required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: selectedClient, ...formData }),
      });

      if (!res.ok) throw new Error("Failed");

      setFormData({
        title: "",
        description: "",
        category: "",
        due_date: "",
        status: "Pending",
        priority: "Medium",
      });

      setShowForm(false);
      onTaskAdded();
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedClient) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        className="add-task-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add Task"}
      </button>

      {showForm && (
        <form className="task-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Save Task</button>
        </form>
      )}
    </div>
  );
}

export default AddTaskForm;