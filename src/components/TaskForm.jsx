import React, { useState, useContext } from "react";
import { Input, Button, Form } from "antd";
import { TaskContext } from "../context/TaskContext";

const { TextArea } = Input;

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!taskName || !taskDescription) {
      alert("Both fields are required!");
      return;
    }

    addTask({ name: taskName, description: taskDescription });

    setTaskName("");
    setTaskDescription("");
  };

  return (
    <div className="flex justify-center mt-6">
      <Form
        layout="vertical"
        className="w-full max-w-2xl border p-6 rounded-lg shadow-md bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Add New Task
        </h2>
        <Form.Item label="Task Name" className="mb-4">
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Form.Item>
        <Form.Item label="Task Description" className="mb-6">
          <TextArea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            rows={4}
            className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleAddTask}
          className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md"
        >
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
