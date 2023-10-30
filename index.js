import {
  addTaskButton,
  listTitle,
  taskInputText,
  taskList,
} from "./scripts/elements.js";
import { handleCreateTodo } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";

export const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
  if (todos.length > 0) {
    listTitle.classList.remove("hide");
    listTitle.classList.add("show");
    return;
  }
  listTitle.classList.remove("show");
  listTitle.classList.add("hide");
};

addTaskButton.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("input", validateInput);

renderTodoList();
