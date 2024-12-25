import React, { useState, useContext } from "react";
import { List, Checkbox, Button, Input, Modal } from "antd";
import { TaskContext } from "../context/TaskContext";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  UndoOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const TaskList = () => {
  const { tasks, deleteTask, toggleComplete, editTask } =
    useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: "", description: "" });
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // States for delete confirmation modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Function to handle edit task click
  const handleEditClick = (task) => {
    setCurrentTaskId(task.id);
    setEditedTask({ name: task.name, description: task.description });
    setIsEditing(true); // Show modal
  };

  // Function to handle task update inside modal
  const handleUpdateTask = () => {
    if (!editedTask.name || !editedTask.description) {
      alert("Both fields are required!");
      return;
    }
    editTask(currentTaskId, editedTask); // Update task using context
    setIsEditing(false); // Close the modal
    setCurrentTaskId(null); // Clear current task ID
    setEditedTask({ name: "", description: "" }); // Clear input fields
  };

  // Function to show the delete confirmation modal
  const showDeleteModal = (task) => {
    setTaskToDelete(task); // Set the task to be deleted
    setIsDeleteModalVisible(true); // Show the delete modal
  };

  // Function to handle canceling the delete operation
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false); // Close the delete modal
    setTaskToDelete(null); // Clear task to delete
  };

  // Function to handle the confirmation of task deletion
  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id); // Call the delete task function from context
      setIsDeleteModalVisible(false); // Close the modal
      setTaskToDelete(null); // Clear task to delete
    }
  };

  return (
    <div className="mt-6">
      <List
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            className={`flex justify-between items-center ${
              task.completed
                ? "bg-green-100 text-lg text-gray-500 font-semi"
                : ""
            }`}
          >
            <div className="flex items-center">
              <Checkbox
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <div className="ml-4 text-lg">
                <h3
                  className={
                    task.completed
                      ? "line-through"
                      : "text-xl font-bold text-gray-900"
                  }
                >
                  {task.name}
                </h3>
                <p className={task.completed ? "line-through" : ""}>
                  {task.description}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!task.completed && (
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => toggleComplete(task.id)}
                />
              )}
              {task.completed && (
                <Button
                  icon={<UndoOutlined />}
                  onClick={() => toggleComplete(task.id)}
                />
              )}
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditClick(task)} // Open the edit modal
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => showDeleteModal(task)} // Show delete confirmation modal
              />
            </div>
          </List.Item>
        )}
      />

      {/* Modal for editing task */}
      <Modal
        title="Edit Task"
        open={isEditing}
        onCancel={() => setIsEditing(false)} // Close modal
        onOk={handleUpdateTask} // Save changes
        okText="Update Task"
        cancelText="Cancel"
      >
        <div>
          <Input
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            placeholder="Task Name"
          />
          <TextArea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            placeholder="Task Description"
            rows={4}
            className="mt-4"
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Task"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm} // Confirm delete
        onCancel={handleDeleteCancel} // Cancel delete
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }} // Make delete button red
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default TaskList;
