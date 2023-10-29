import { renderTodoList } from "../index.js";
import { taskInputText, errorMessage } from "./elements.js";
import { todos } from "./deteleTask.js";
import { validateInput } from "./utilities.js";

const resetTaskInput = () => {
  taskInputText.value = "";
};

const generateUniqueId = () => {
  return Date.now();
};

export const handleCreateTodo = () => {
  const textContent = taskInputText.value;

  if (validateInput() === false) {
    return;
  }

  const taskId = generateUniqueId();
  const task = {
    id: taskId,
    value: textContent,
    done: false,
    edit: false,
    error: "",
  };
  todos.push(task);
  errorMessage.innerHTML = "";
  renderTodoList();
  resetTaskInput();
};
