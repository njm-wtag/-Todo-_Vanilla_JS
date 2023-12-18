import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";

export const handleDone = (taskId) => {
  const task = todos.find((todo) => todo.id === taskId);
  task.isDone = true;
  renderTodoList(todos);
};
