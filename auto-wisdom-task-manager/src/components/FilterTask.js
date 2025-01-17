import React from "react";

const FilterTask = ({ filter, setFilter }) => {
  // Possible categories and statuses
  const categories = ["All", "Backend", "Frontend", "API Integration"];
  const statuses = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="filter-task-container">
      {/* Filter by Category */}
      <div className="filter-group">
        <h3>Filter by Category:</h3>
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                filter.category === category ? "active" : ""
              }`}
              onClick={() => setFilter({ ...filter, category })}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Status */}
      <div className="filter-group">
        <h3>Filter by Status:</h3>
        <div className="filter-buttons">
          {statuses.map((status) => (
            <button
              key={status}
              className={`filter-button ${
                filter.status === status ? "active" : ""
              }`}
              onClick={() => setFilter({ ...filter, status })}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTask;
