import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, updateTaskStatus }) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any column
    if (!destination) return;

    // If dropped in the same column, no action needed
    if (source.droppableId === destination.droppableId) return;

    // Update task status
    const taskId = result.draggableId;
    updateTaskStatus(taskId, destination.droppableId);
  };

  const columns = {
    Pending: tasks.filter((task) => task.status === "Pending"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-list-container">
        {Object.keys(columns).map((columnId) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                className="task-column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>{columnId}</h3>
                {columns[columnId].map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h4>{task.title}</h4>
                        <p>Category: {task.category}</p>
                        <p>Priority: {task.priority}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
