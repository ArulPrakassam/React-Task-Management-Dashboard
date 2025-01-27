import { useEffect } from "react";
import "../styles/taskform.css";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../context";

const TaskForm = () => {
  const {
    setOpenForm,
    newTask,
    setNewTask,
    formHandler,
    error,
    isEditing,
    setIsEditing,
    setEditID,
  } = useGlobalContext();
  return (
    <section className="modal-content">
      <form className="modal-container" onSubmit={formHandler}>
        <div className="modal-header">
          <h1>{isEditing ? "Edit the task " : "Add New Task"}</h1>
          <span
            className="close-modal"
            onClick={() => {
              setOpenForm(false);
              setIsEditing(false);
              setEditID(null);
            }}
          >
            <MdOutlineClose />
          </span>
        </div>
        <div className="modal-body">
          <div className="title-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div className="description-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols={20}
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="task-due-date">
            <label htmlFor="due-date">Due Date</label>
            <input
              type="date"
              name="due-date"
              id="due-date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </div>
        </div>
        <div className="modal-footer">
          <div className="priority-input">
            <div className="dropdown-box">
              <select
                name="filter"
                id="filter-priority"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              >
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="task-status">
            <div className="dropdown-box">
              <select
                name="filter"
                id="filter-status"
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
              >
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          {error.message && (
            <div className="error-message">
              <p>{error.message}</p>
            </div>
          )}
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
