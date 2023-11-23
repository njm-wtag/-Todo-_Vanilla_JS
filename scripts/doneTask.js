import { renderTodoList } from "../index.js";
import { todos } from "./deteleTask.js";

export const handleDone = (taskId, doneState) => {
  const task = todos.find((todo) => todo.id === taskId);
  // console.log("PPPPPPPPPP");
  if (task === undefined) {
    return;
  }
  console.log({ doneState });
  task.isDone = Boolean(doneState);
  renderTodoList();

  return;
};
