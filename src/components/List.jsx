import { FaRegClock } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Button from "./Button";
import { useGlobalContext } from "../context";

const List = () => {
  const { displayedTasks, editItem, setConfirmDelete } = useGlobalContext();
  return (
    <>
      {displayedTasks.length < 1 ? (
        <div className="no-tasks-alert">
          <p>No Tasks found</p>
        </div>
      ) : (
        displayedTasks.map((item) => {
          const { id, title, description, priority, dueDate, status } = item;

          return (
            <article className="task-item" key={id} id={id}>
              {/* task header */}
              <div className="task-header">
                <div className="priority">
                  <Button value={priority} />
                </div>
                <div className="options">
                  <div
                    className="edit-icon"
                    title="edit"
                    onClick={() => editItem(id)}
                  >
                    <FiEdit />
                  </div>
                  <div
                    className="delete-icon"
                    title="delete"
                    onClick={() => {
                      setConfirmDelete({ id, status: true });
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
              {/* task body */}
              <div className="task-body">
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
              {/* task footer */}
              <div className="task-footer">
                <div className="due-date">
                  <FaRegClock />
                  <p>{dueDate}</p>
                </div>
                <Button value={status} />
              </div>
            </article>
          );
        })
      )}
    </>
  );
};

export default List;
