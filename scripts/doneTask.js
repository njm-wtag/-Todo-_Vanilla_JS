import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";
import { handleUpdate } from "./editUpdateTask.js";

export const handleDone = (taskId, updatedText) => {
  const task = todos.find((todo) => todo.id === taskId);
  if (task.isEditing) {
    if (updatedText !== "") {
      handleUpdate(taskId, updatedText);
      task.isDone = true;
    } else {
      task.value = "";
      task.error = "Updated task can not be empty";
      renderTodoList();
      return;
    }
  } else {
    task.isDone = true;
  }

  renderTodoList();
};
