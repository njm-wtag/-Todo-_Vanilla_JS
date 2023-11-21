import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";

export const handleDone = (taskId, doneState) => {
  const task = todos.find((todo) => todo.id === taskId);

  if (task === undefined) {
    return;
  }

  task.isDone = Boolean(doneState);
  renderTodoList();

  return;
};
