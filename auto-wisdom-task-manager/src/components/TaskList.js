import React from "react";

const TaskList = ({ tasks, updateTaskStatus, deleteTask }) => {
  return (
    <div className="task-form-container">
      <div className="task-list-heading">
      <h2 className="task-list-heading">List of Tasks</h2>
      </div>
      {/* Dropdown lists */}
      <div className="task-form">
        <select>
        <option value="Select">Select</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Design">Design</option>
        </select>
        <select>
        <option value="Select">Select</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => updateTaskStatus(task.id, "Completed")}>
              Mark Completed
            </button>
            <button onClick={() => updateTaskStatus(task.id, "In Progress")}>
              Mark In Progress
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button type="submit" className="show-task-button"> Show Task </button>
    </div>
  );
};

export default TaskList;
