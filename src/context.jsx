import { useState, useContext, useEffect } from "react";
import React from "react";
import { data } from "./data/tasks";
import { toast } from "react-toastify";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
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

  const removeItem = (id) => {
    setUserTasks(userTasks.filter((item) => item.id !== id));
    toast.success(`Task with id ${id} deleted successfully`);
  };
  const editItem = (id) => {
    const specificItem = userTasks.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setNewTask(specificItem);
    setOpenForm(true);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(userTasks));
  }, [userTasks]);

  return (
    <AppContext.Provider
      value={{
        getLocalStorage,
        userTasks,
        setUserTasks,
        loading,
        setLoading,
        newTask,
        setNewTask,
        formHandler,
        removeItem,
        editItem,
        error,
        openForm,
        setOpenForm,
        isEditing,
        setIsEditing,
        setEditID,
        confirmDelete,
        setConfirmDelete,
        displayedTasks,
        setDisplayedTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
