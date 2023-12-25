import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";
import { handleUpdate } from "./editUpdateTask.js";

export const handleDone = (taskId, updatedText) => {
  const task = todos.find((todo) => todo.id === taskId);
  if (task.isEditing) {
    if (updatedText !== "") {
      console.log("Aaaaaaa");
      handleUpdate(taskId, updatedText);
      task.isDone = true;
    } else {
      console.log("bbbbbbbbb");
      task.value = "";
      task.isEditing = true;
      task.error = "Updated task can not be empty";
      renderTodoList(todos);
      return;
    }
  } else {
    task.isDone = true;
  }

  renderTodoList(todos);
};
