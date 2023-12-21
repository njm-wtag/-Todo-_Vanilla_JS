import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";
import { isUserInputValid } from "./utilities.js";

export const handleEdit = (taskId) => {
  const todoToEdit = todos.find((todo) => todo.id === taskId);
  todoToEdit.isEditing = true;
  renderTodoList(todos);
};

export const handleCancel = (task) => {
  task.isEditing = false;
  renderTodoList(todos);
};

export const handleUpdate = (taskId, updatedValue) => {
  const taskToUpdate = todos.find((todo) => todo.id === taskId);

  if (isUserInputValid(updatedValue)) {
    taskToUpdate.value = updatedValue;
    taskToUpdate.isEditing = false;
    taskToUpdate.isDone = false;
    taskToUpdate.error = "";
  } else {
    taskToUpdate.error = "Updated task can not be empty";
    taskToUpdate.value = "";
  }

  renderTodoList(todos);
};
