import { MdOutlineFilterList, MdAddBox } from "react-icons/md";
import { useState, useEffect } from "react";
import "../styles/filters.css";
import TaskForm from "./TaskForm";
import { DropDown, Input } from "./FilterElements";
import { useGlobalContext } from "../context";

const Filters = () => {
  const {
    userTasks,
    setLoading,
    setNewTask,
    openForm,
    setOpenForm,
    setDisplayedTasks,
  } = useGlobalContext();

  const [sortDescending, setSortDescending] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // search input and filter tasks by title
  const searchFilter = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearchTerm(searchValue);
  };

  // filter selection (status and priority)
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

  // to filter tasks based on due date
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
        const previousWeekStart = new Date(
          currentDate.setDate(startOfWeek - 7)
        ); // getting previous week start (sunday) by subtracting 7
        const previousWeekEnd = new Date(currentDate.setDate(startOfWeek - 1)); // getting previous week end (Saturday) by subtracting 1
        return dueDate >= previousWeekStart && dueDate <= previousWeekEnd;
      default:
        return true; // If no filter is applied, return all tasks
    }
  };

  //sort by priority

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

  // to update filtered data when any filter or search term changes
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

  return (
    <>
      <section className="filter-section">
        <Input searchFilter={searchFilter} />
        <DropDown
          sortDescending={sortDescending}
          setSortDescending={setSortDescending}
          selectFilter={selectFilter}
          name={"status"}
        />
        <DropDown
          sortDescending={sortDescending}
          setSortDescending={setSortDescending}
          selectFilter={selectFilter}
          name={"priority"}
        />
        <DropDown
          sortDescending={sortDescending}
          setSortDescending={setSortDescending}
          selectFilter={selectFilter}
          name={"dueDate"}
        />

        <div
          className="add-new-task"
          title="add new task"
          onClick={() => {
            setNewTask({
              title: "",
              description: "",
              dueDate: "",
              priority: "",
              status: "",
              id: "",
            });
            setOpenForm(true);
          }}
        >
          <div className="add-new-icon">
            <MdAddBox />
          </div>
          <p>Add new task</p>
        </div>
      </section>

      {/* Task form*/}
      {openForm && <TaskForm />}
    </>
  );
};

export default Filters;
