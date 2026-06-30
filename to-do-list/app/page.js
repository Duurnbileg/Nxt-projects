"use client";
import { useState } from "react";
import List from "./components/list";
import Alert from "./components/alert";

export default function Home() {
  const [inputValue, setinputValue] = useState("")
  const [savedInput, setsavedInput] = useState([])
  const [number, setnumber] = useState(0)
  const [select, setselect] = useState("active");

  const inputAdd = () => {
    if (inputValue !== "") {
      setnumber(number + 1)
      setsavedInput([...savedInput, {
        id: number,
        text: inputValue,
        isDone: false
      }])
      setinputValue("")
    }
  }

  const deleteTask = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this task?");

    if (isConfirmed) {
      setsavedInput(
        savedInput.filter((task) => task.id !== id)
      );
      setnumber(number - 1)
    }
  };

  const clearAll = (id) => {
    const isAllConfirmed = confirm("Are you sure you want to clear all completed tasks?")

    if (isAllConfirmed) {
      setsavedInput(
        savedInput.filter((task) => task.isDone !== true)
      )
    }
  }

  const checkedTasks = savedInput.filter((item) => item.isDone == true)

  const toggleTask = (id) => {
    setsavedInput(
      savedInput.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  };

  const filteredTask = savedInput.filter((task) => {
    if (select === "all") {
      return task;
    } else if (select === "active") {
      return !task.isDone;
    } else if (select === "completed") {
      return task.isDone;
    }
  });

  console.log(savedInput);


  const handleAll = () => {
    setselect("all");
  };
  const handleActive = () => {
    setselect("active");
  };
  const handleCompleted = () => {
    setselect("completed");
  };


  return (
    <div className="w-full min-h-screen flex justify-center pt-6 bg-gray-100">
      <div className="h-fit  bg-white rounded-xl p-6 shadow-md mt-6 flex flex-col gap-10 drop-shadow-xl">
        <div className="flex flex-col gap-5">
          <h1 className="text-center font-semibold text-2xl text-[black] ">
            To-Do list
          </h1>
          <div className="flex flex-col mt-4">
            <div className="flex gap-2 mt-4">
              <input
                placeholder="Add a new task..."
                className="flex-1 w-75 border border-gray-300 rounded-md px-3 py-2 text-black"
                onChange={(event) => setinputValue(event.target.value)}
                value={inputValue}
              />
              <button
                onClick={inputAdd}
                className="bg-blue-500 text-white px-6 rounded-md">
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAll}
              className={` rounded-lg px-4 py-2 text-black ${select === "all" ? "bg-[#3C82F6] text-white" : "bg-gray-100 "
                }`}
            >
              All
            </button>

            <button
              onClick={handleActive}
              className={` rounded-lg px-4 py-2 text-black ${select === "active" ? "bg-[#3C82F6] text-white" : "bg-gray-100 "
                }`}
            >
              Active
            </button>

            <button
              onClick={handleCompleted}
              className={` rounded-lg px-4 py-2 text-black ${select === "completed" ? "bg-[#3C82F6] text-white" : "bg-gray-100 "
                } `}
            >
              Completed
            </button>
          </div>
          <div>
            {filteredTask.map((item, index) => (
              <List key={item.id} savedInput={item} toggleTask={toggleTask} deleteTask={deleteTask} />
            ))}
          </div>
          {savedInput.length !== 0 && (
            <Alert number={number} taskNumber={checkedTasks.length} clearAll={clearAll} savedInput={savedInput} />
          )}
          {savedInput.length === 0 && (
            <p className="text-center text-gray-500 ">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
        <div className="flex gap-2 justify-center text-center text-gray-500 flex-row mb-6">
          <p>Powered by</p>
          <a href="https://talent.pinebaatars.mn/" className="text-blue-500">
            Pinecone academy
          </a>
        </div>
      </div>
    </div>
  );
}
