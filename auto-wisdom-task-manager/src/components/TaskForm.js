import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [priority, setPriority] = useState("Set priority");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      id: Date.now(),
      title,
      category,
      priority,
      status: "In Progress",
    });
    setTitle("");
  };

  return (
    <div className="task-form-container">
     {/* Subheading */}
     <h2 className="task-form-heading">Add Task</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Select Category" disabled>
            Select Category
          </option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="API Integration">API Integration</option>
        </select>
        <div className="task-priority">
          <label>
            <input
              type="radio"
              value="Low"
              checked={priority === "Low"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              value="Medium"
              checked={priority === "Medium"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="High"
              checked={priority === "High"}
              onChange={(e) => setPriority(e.target.value)}
            />
            High
          </label>
        </div>
        <button type="submit" className="add-task-button">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
