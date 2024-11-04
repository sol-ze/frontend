import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import TaskField from "../components/TaskField";
import TasksTable from "../components/TasksTable";

const HomePage = () => {
  const [tasks, setTasks] = useState(null);

  const fetchTasks = () => {
    axios
      .get("/api/task/")
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      // Delete from DB
      await axios.delete(`/api/task/${taskId}`);

      // Fetch the updated tasks from the database
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleNewTask = async (newTask) => {
    try {
      // Add the new task to the database
      await axios.post("/api/task/", { task: newTask });

      // Fetch the updated tasks from the database
      fetchTasks();
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  if (tasks) {
    return (
      <Fragment>
        <div className="my-5 px-5">
          <h1>My Tasks List</h1>
          <TasksTable tasks={tasks} handleDelete={handleDelete} />

          <h4>Create A task</h4>
          <TaskField
            children="Create"
            onClick={(newTask) => handleNewTask(newTask)}
          />
        </div>
      </Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default HomePage;
