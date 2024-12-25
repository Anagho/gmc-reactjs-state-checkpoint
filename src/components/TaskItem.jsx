import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Checkbox } from "antd";

function TaskItem({ task, editTask, deleteTask, toggleComplete }) {
  const handleEdit = () => {
    // Start editing task logic here
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleCheckboxChange = (e) => {
    toggleComplete(task.id, e.target.checked); // Mark task as completed or incomplete
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center space-x-3">
        {/* Checkbox for marking the task as completed */}
        <Checkbox
          checked={task.isCompleted}
          onChange={handleCheckboxChange}
          className="text-green-500"
        />
        <div className="flex flex-col">
          <p
            className={`text-lg font-bold ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.name}
          </p>
          <p
            className={`text-gray-500 ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        {/* Complete (Green Check) Button */}
        {task.isCompleted ? (
          <Button
            icon={<UndoOutlined />}
            onClick={() => toggleComplete(task.id, false)} // Undo task completion
            size="small"
            danger
          />
        ) : (
          <Button
            icon={<CheckOutlined />}
            onClick={() => toggleComplete(task.id, true)} // Mark task as completed
            size="small"
            className="text-green-500"
          />
        )}

        {/* Edit Button */}
        <Button icon={<EditOutlined />} onClick={handleEdit} size="small" />

        {/* Delete Button */}
        <Button
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          size="small"
          danger
        />
      </div>
    </div>
  );
}

export default TaskItem;
