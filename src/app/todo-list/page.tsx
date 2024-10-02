"use client";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FiCircle } from "react-icons/fi";
import axios from "axios";
import { showToast } from "@/components/LoveToast";
import { FaArrowRotateRight } from "react-icons/fa6";

type Task = {
  _id: string;
  task: string;
  isComplete: boolean;
};

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [loading, setIsLoading] = useState(false);
  const addTaskHandler = async () => {
    if (!task) {
      showToast("no task found", "error");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/add-todo", {
        task,
        isComplete: false,
      });
      const newTodo = response.data.data;
      setTasksData((prevTasks) => [...prevTasks, newTodo]);
      showToast("task added", "success");
      setTask("");
    } catch (error) {
      console.log("error: ", error);
      showToast("error in adding task", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.post("/api/get-todo");
        setTasksData([...response?.data?.data] || []);
      } catch (error) {
        console.log(error);
        showToast("error in adding task", "error");
      }
    };
    fetchTodo();
  }, []);

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/delete-todo/${id}`);
      setTasksData((prevTasks) => prevTasks.filter((todo) => todo._id !== id));
      showToast("Todo deleted successfully", "success");
    } catch (error) {
      console.log("error in deleting todo: ", error);
      showToast("error in deleting Todo", "error");
    }
  };

  const updateTodo = async (id: string, isComplete: boolean) => {
    try {
      const response = await axios.put(`/api/update-todo/${id}`, {
        isComplete,
      });
      const updatedTodo = response.data.data;
      setTasksData((prevTodo) =>
        prevTodo.map((todo) =>
          todo._id === id
            ? { ...todo, isComplete: updatedTodo.isComplete }
            : todo
        )
      );
      if (isComplete === true) showToast("Todo marked as completed", "success");
      else showToast("Todo marked as Incomplete", "success");
    } catch (error) {
      console.log("error in updating Todo: ", error);
    }
  };

  return (
    <div className="p-4">
      <div className="pt-24 text-center flex flex-col">
        <h1 className="text-5xl font-bold font-mono pb-4 text-blue-500">
          To-do List
        </h1>
        <p className="text-xs pb-4 font-semibold text-blue-400">
          Baby you can schedule your tasks here
        </p>
        <div className="flex justify-center items-center gap-2 pb-8">
          <input
            type="text"
            className="w-52 px-2 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            disabled={loading}
            onClick={addTaskHandler}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {loading ? (
                <FaArrowRotateRight size={16} className="animate-spin" />
              ) : (
                "Add"
              )}
            </span>
          </button>
        </div>

        {tasksData.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between gap-4 pb-3"
          >
            <p className="flex-none">
              {todo.isComplete ? (
                <TiTick
                  size={35}
                  className="text-blue-500 transition-transform transform hover:scale-110 active:scale-90 hover:text-green-500 active:text-green-400"
                  onClick={() => updateTodo(todo._id, false)}
                />
              ) : (
                <FiCircle
                  size={30}
                  className="text-gray-500 transition-transform transform hover:scale-110 active:scale-90 hover:text-blue-500 active:text-blue-400"
                  onClick={() => updateTodo(todo._id, true)}
                />
              )}
            </p>
            <p className="flex-grow text-start text-xl break-all">
              {todo.task}
            </p>
            <p className="flex-none">
              <IoClose
                size={35}
                onClick={() => deleteTodo(todo._id)}
                className="text-blue-400 transition-transform transform hover:scale-110 active:scale-90 hover:text-red-500 active:text-red-400"
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
