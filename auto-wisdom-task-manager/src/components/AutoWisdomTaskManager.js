import React, { useState } from "react";
import { useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ThemeToggle from "./ThemeToggle";
import FilterTask from "./FilterTask";

const AutoWisdomTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState({ category: "All", status: "All" }); 

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (id, status) => {
    const numericId = parseInt(id, 10);
    
    setTasks(
      tasks.map((task) => 
        task.id === numericId ? { ...task, status } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = `${savedTheme}-theme`;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.className = `${newTheme}-theme`;
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.category === "All" || task.category === filter.category) &&
      (filter.status === "All" || task.status === filter.status)
    );
  });

  return (
    <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          <h1>Auto Wisdom Task Manager</h1>
        </div>
        <div className="navbar-actions">
          <button className="login-button">Login</button>
          <ThemeToggle toggleTheme={toggleTheme} />
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