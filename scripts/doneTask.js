import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";

export const handleDone = (taskId, doneState) => {
  const task = todos.find((todo) => todo.id === taskId);
  console.log({ doneState });
  if (doneState) {
    task.isDone = true;
  } else task.isDone = false;
  renderTodoList();
};
