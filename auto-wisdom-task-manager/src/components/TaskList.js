import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, updateTaskStatus }) => {
  const handleDragEnd = (result) => {
    // Detailed logging of the drag result
    console.log('Drag end result:', {
      draggableId: result.draggableId,
      source: result.source,
      destination: result.destination,
      type: result.type,
      reason: result.reason,
      mode: result.mode,
      fullResult: result
    });

    const { source, destination, draggableId } = result;

    // Log if destination is null
    if (!destination) {
      console.log('No destination provided - drop was cancelled or outside valid drop target');
      return;
    }

    // Log if it's a same-position drop
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      console.log('Dropped in the same position - no update needed');
      return;
    }

    // Log the status update attempt
    console.log('Attempting to update task status:', {
      taskId: draggableId,
      fromStatus: source.droppableId,
      toStatus: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index
    });

    updateTaskStatus(draggableId, destination.droppableId);
  };

  // Add logging to track what tasks are in each column
  const getColumnTasks = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(`Tasks in ${status}:`, filteredTasks);
    return filteredTasks;
  };

  const columns = [
    { id: "Pending", title: "Pending" },
    { id: "In Progress", title: "In Progress" },
    { id: "Completed", title: "Completed" }
  ];

  return (
    <div className="task-manager">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          {columns.map((column) => (
            <div key={column.id} className="column">
              <h3 className="column-title">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable-area ${
                      snapshot.isDraggingOver ? 'dragging-over' : ''
                    }`}
                    style={{ minHeight: '200px' }} // Ensure drop area is visible
                  >
                    {getColumnTasks(column.id).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-card ${
                              snapshot.isDragging ? 'dragging' : ''
                            }`}
                          >
                            <h4 className="task-title">{task.title}</h4>
                            <p className="task-detail">Category: {task.category}</p>
                            <p className="task-detail">Priority: {task.priority}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;