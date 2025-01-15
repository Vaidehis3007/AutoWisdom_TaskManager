import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import "../TaskManager.css";

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
  <FontAwesomeIcon icon={faAdjust} />
</button>
  );
};

export default ThemeToggle;