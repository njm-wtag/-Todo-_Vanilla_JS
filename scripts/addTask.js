import { ALL } from "./const.js";
import { disableFilterBar, filterTasksByStatus } from "./actions.js";
import { taskInputText, errorMessage } from "./elements.js";
import { validateInput } from "./utilities.js";
import { renderTodoList } from "../index.js";

export const resetTaskInput = () => {
  taskInputText.value = "";
};

const generateUniqueId = () => {
  return Date.now();
};

export const handleCreateTodo = (todos) => {
  const textContent = taskInputText.value;

  if (validateInput() === false) {
    return;
  }

  const taskId = generateUniqueId();
  const task = {
    id: taskId,
    value: textContent,
    isDone: false,
    isEditing: false,
    createdAt: Date.now(),
    error: "",
  };

  todos.unshift(task);
  resetTaskInput();

  errorMessage.innerHTML = "";

  disableFilterBar();

  todos.length === 1 &&
    document.getElementById("all").classList.add("selected");
  filterTasksByStatus(ALL, todos);
  renderTodoList(todos);
};
