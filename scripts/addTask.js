import { renderTodoList } from "../index.js";
import { taskInputText, errorMessage } from "./elements.js";
import { validateInput } from "./utilities.js";

export const resetTaskInput = () => {
  taskInputText.value = "";
};

const generateUniqueId = () => {
  return Date.now();
};

export const handleCreateTodo = (todos) => {
  const textContent = taskInputText.value;
  console.log();
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
  errorMessage.innerHTML = "";

  // todos.length > 2 &&
  //   (loadMoreButton.classList.remove("hide"),
  //   loadMoreButton.classList.add("show"));

  renderTodoList();
  resetTaskInput();

  // return pageCount;
};
