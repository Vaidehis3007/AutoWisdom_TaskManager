import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ThemeToggle from "./ThemeToggle";
import FilterTask from "./FilterTask"; // Import FilterTask component
import "../TaskManager.css";

const AutoWisdomTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(false); // false = light, true = dark
  const [filter, setFilter] = useState({ category: "All", status: "All" }); // Initialize filter state

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.category === "All" || task.category === filter.category) &&
      (filter.status === "All" || task.status === filter.status)
    );
  });

  return (
    <div className={theme ? "dark-theme" : "light-theme"}>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          <h1>Auto Wisdom Task Manager</h1>
        </div>
        <div className="navbar-actions">
          <button className="login-button">Login</button>
          <ThemeToggle toggleTheme={() => setTheme(!theme)} />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
        <FilterTask filter={filter} setFilter={setFilter} /> {/* Add FilterTask */}
      </main>
    </div>
  );
};

export default AutoWisdomTaskManager;
