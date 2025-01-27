# React Task Management Dashboard

A user task management dashboard which also users to add, edit, delete tasks and able to set priority and status for the tasks. And also many filtering options are available such as priority filtering, status filtering, input search filtering.

Live URL: [Task Management Dashboard](https://react-task-management-dashboard.netlify.app/)

## Features

- Add, Edit, Delete Tasks
- Filtering by status, priority, due date and input search

## Tech Stack

- Client - React
- Hosting - Netlify

## App.jsx

Inside App.js we have three components Header, Dashboard and Footer. And also we have one more ToastContainer to show popup noifications.

```js
<main>
  <Header />
  <Dashboard />
  <ToastContainer position="top-center" />
  <Footer />
</main>
```

## useContext.jsx

We are using usecontext you pass props across components

### main.jsx

```js
<StrictMode>
  <AppProvider>
    <App />
  </AppProvider>
</StrictMode>
```

### context.jsx

In context.jsx, we are getting the values from localstorage, if localstorage has no values then we will get from the data.js filter.

Here we are using two states, one for showing the data to user (displayedTasks) and other for updating the user tasks when we do make a creation or edit or updation of tasks (userTasks).

displayedTasks will be used for filtering data and rendering in the UI screen.

```js
const [userTasks, setUserTasks] = useState(getLocalStorage);
const [displayedTasks, setDisplayedTasks] = useState(userTasks);
const [loading, setLoading] = useState(true);
const [newTask, setNewTask] = useState({
  title: "",
  description: "",
  dueDate: "",
  priority: "",
  status: "",
  id: "",
});
const [error, setError] = useState({
  message: "",
});
const [isEditing, setIsEditing] = useState(false);
const [editID, setEditID] = useState(null);
const [openForm, setOpenForm] = useState(false);
const [confirmDelete, setConfirmDelete] = useState({ id: "", status: false });

function getLocalStorage() {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    localStorage.setItem("list", JSON.stringify(data));
    return data;
  }
}
```

### To add and edit tasks

```js
const formHandler = (e) => {
  e.preventDefault();

  if (
    newTask.title.trim() !== "" &&
    newTask.description.trim() !== "" &&
    newTask.dueDate.trim() !== "" &&
    newTask.priority.trim() !== "" &&
    newTask.status.trim() !== ""
  ) {
    //checking if due date is before the current date
    const dueDate = new Date(newTask.dueDate);
    const currentDate = new Date();
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (newTask.dueDate && dueDate < currentDate) {
      setError({ message: "Due date cannot be in the past!" });
    } else if (isEditing) {
      //for editing task

      const updatedTasks = userTasks.map((item) => {
        if (item.id === editID) {
          return { ...item, ...newTask };
        }
        return item;
      });
      setUserTasks(updatedTasks);
      setIsEditing(false);
      setEditID(null);
      setOpenForm(false);
      setError({ message: "" });
      toast.success(`Task with id ${newTask.id} edited successfully`);
    } else {
      //for adding new task
      const taskWithId = { ...newTask, id: new Date().getTime() };
      setUserTasks([...userTasks, taskWithId]);
      setOpenForm(false);
      setError({ message: "" });
      toast.success(`New Task with id ${taskWithId.id} added successfully`);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
        id: "",
      });
    }
  } else {
    setError({ message: "Please enter all fields!" });
  }
};
```

### To delete Task

When we click delete button, we will show the confirmation popup and once confirmed we will pass the id and remove the task and update the list.

```js
const removeItem = (id) => {
  setUserTasks(userTasks.filter((item) => item.id !== id));
  toast.success(`Task with id ${id} deleted successfully`);
};
```

### To edit task

When we press the edit button, we will update the form fields with the existing values and we make editing to true and when we submit, the form handler will update the task.

```js
const editItem = (id) => {
  const specificItem = userTasks.find((item) => item.id === id);
  setIsEditing(true);
  setEditID(id);
  setNewTask(specificItem);
  setOpenForm(true);
};
```

When we edit or delete or add, the userTasks list will be updated

```js
useEffect(() => {
  localStorage.setItem("list", JSON.stringify(userTasks));
}, [userTasks]);
```

## Dashboard.jsx

Dashboard has three major components Filters, List, DeletePopup

### List.jsx

List will display the data to the user. If list length is less than one then it will show "No Tasks found".

```js
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
```

### Filters.jsx

searchFilter function will filter the items based upon the search keyword.

```js
const searchFilter = (e) => {
  const searchValue = e.target.value.trim().toLowerCase();
  setSearchTerm(searchValue);
};
```

selectFilter function will set the filter name to react state

```js
const selectFilter = (e) => {
  const { value, dataset } = e.target;
  const filterName = dataset.name;

  if (filterName === "status") {
    setSelectedStatus(value);
  } else if (filterName === "priority") {
    setSelectedPriority(value);
  } else if (filterName === "dueDate") {
    setSelectedDueDate(value);
  }
};
```

filterByDueDate will filter based upon the due date like today, this week, next week, previous week.

```js
const filterByDueDate = (task, selectedDueDate) => {
  const dueDate = new Date(task.dueDate);
  const currentDate = new Date();
  let startOfWeek;
  let startOfWeekDate;

  switch (selectedDueDate) {
    case "today":
      // check if the task is due today
      //comparing current date
      return dueDate.toDateString() === currentDate.toDateString();
    case "thisWeek":
      // check if the task is due this week
      // get the start and end of the current week
      startOfWeek = currentDate.getDate() - currentDate.getDay(); //getting start of week (sunday) by subtracting the current date with the current day (which is index based)
      const endOfWeek = startOfWeek + 6; // getting end of week by adding 6 (we get saturday)
      startOfWeekDate = new Date(currentDate.setDate(startOfWeek));
      const endOfWeekDate = new Date(currentDate.setDate(endOfWeek));
      return dueDate >= startOfWeekDate && dueDate <= endOfWeekDate;
    case "nextWeek":
      // check if the task is due next week
      // get the start and end of next week
      startOfWeek = currentDate.getDate() - currentDate.getDay(); //getting start of week (sunday) by subtracting the current date with the current day (which is index based)
      const nextWeekStart = new Date(currentDate.setDate(startOfWeek + 7)); //getting next week start (sunday) by adding 7
      const nextWeekEnd = new Date(currentDate.setDate(startOfWeek + 13)); //getting next week end (saturday) by adding 13
      return dueDate >= nextWeekStart && dueDate <= nextWeekEnd;

    case "previousWeek":
      //check if the task is due previous week
      startOfWeek = currentDate.getDate() - currentDate.getDay(); //getting start of week (sunday) by subtracting the current date with the current day (which is index based)
      const previousWeekStart = new Date(currentDate.setDate(startOfWeek - 7)); // getting previous week start (sunday) by subtracting 7
      const previousWeekEnd = new Date(currentDate.setDate(startOfWeek - 1)); // getting previous week end (Saturday) by subtracting 1
      return dueDate >= previousWeekStart && dueDate <= previousWeekEnd;
    default:
      return true; // If no filter is applied, return all tasks
  }
};
```

sortByPriority will sort the items based on priority. By default we will show high priority tasks on top

```js
const sortByPriority = (data) => {
  const priorityMap = {
    low: 0,
    medium: 1,
    high: 2,
  };
  const prioritySortedData = data.toSorted((i, j) => {
    const priorityA = priorityMap[i.priority];
    const priorityB = priorityMap[j.priority];

    //(low -> medium -> high): (high->medium->low)
    //by default we display high priority tasks first
    return sortDescending ? priorityA - priorityB : priorityB - priorityA;
  });
  setLoading(false);
  return prioritySortedData;
};
```

This useEffect will help to filter the tasks.

```js
useEffect(() => {
  let filteredData = [...userTasks];

  setLoading(true);

  // filter by search term
  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
  }

  // filter by selected status
  if (selectedStatus) {
    filteredData = filteredData.filter((item) =>
      item.status.toLowerCase().includes(selectedStatus)
    );
  }

  // filter by selected priority
  if (selectedPriority) {
    filteredData = filteredData.filter((item) =>
      item.priority.toLowerCase().includes(selectedPriority)
    );
  }

  // filter by selected due date
  if (selectedDueDate) {
    filteredData = filteredData.filter((item) =>
      filterByDueDate(item, selectedDueDate)
    );
  }

  //sort by priority
  const sorted = sortByPriority(filteredData);

  setDisplayedTasks(sorted);
}, [
  searchTerm,
  selectedStatus,
  selectedPriority,
  selectedDueDate,
  sortDescending,
  setLoading,
  userTasks,
]);
```

### DeletePopup.jsx

Delete pop up will give a confirmation pop up and after selecting confirm we will delete the task from the list.

```js
<section className="modal-content">
  <div className="modal-container delete-confirmation">
    <div className="confirmation-text">
      <p>Are you sure want to delete this task?</p>
    </div>
    <div className="confirmation-buttons">
      <button
        type="button"
        className="cancel-button"
        onClick={() => {
          setConfirmDelete(false);
        }}
      >
        Cancel
      </button>
      <button
        type="button"
        className="confirm-button"
        onClick={() => {
          setConfirmDelete({ ...confirmDelete, status: false });
          removeItem(confirmDelete.id);
        }}
      >
        Confirm
      </button>
    </div>
  </div>
</section>
```

## TaskForm.jsx

It is used to add new task and edit existing task

```js
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
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
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
```

## Header.jsx

Inside the Header we have Navbar.

```js
<header>
  <Navbar />
</header>
```

## Footer.jsx

In the Footer, we have our footer credits
